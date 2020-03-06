'use strict';
require('dotenv').config();

const gSpeech = require('@google-cloud/speech');
const algoliasearch = require("algoliasearch");
const addDays = require('date-fns/addDays');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app); // I'm not sure if this is used yet
const got = require('got');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const Nexmo = require('nexmo');
const { Readable } = require('stream'); // I think this isn't used yet

const index = algoliasearch(
  process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY
).initIndex(process.env.ALGOLIA_INDEX);
const assistant = new AssistantV2({
  version: '2020-02-05',
  authenticator: new IamAuthenticator({ apikey: process.env.ASSISTANT_APIKEY })
});
const gSTTclient = new gSpeech.SpeechClient(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APP_ID,
  privateKey: process.env.PRIVATE_KEY || './private.key'
});
let calls = nexmo.calls; // this is because nexmo wasn't returning nexmo.calls.talk.start immedietely,
let talk = calls.talk;   // was throwing async error.
let gSTTparams = { // static parameters google speech-to-text needs.
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: process.env.LANG_CODE || 'en-US'
  },
  interimResults: false
};
let caller = null;   // caller's phone number.
let callUUID = null; // unique ID of this phone call session.

app.use(bodyParser.json());

app.get('/ncco', (req, res) => { // ncco = Nexmo Call Control Object: the data needed to forward the call.
  let nccoResponse = [{
    "action": "connect",
    "endpoint": [{
      "type": "websocket",
      "content-type": "audio/l16;rate=16000",
      "uri": `ws://${process.env.WEBSITE_URL}/socket`
    }]
  }];
  res.status(200).json(nccoResponse);
});

app.post('/event', (req, res) => {   // whenever something happends on the Nexmo side of the call it uses this to update us.
  if (req.body.from !== 'Unknown') {
    caller = req.body.from;
    callUUID = req.body.uuid;
  }
  console.log('EVENT from', caller, 'to', req.body.to, req.body.status);
  // console.log('EVENT LOG::', req.body);
  res.status(204).end();
});

app.ws('/socket', (ws, req) => { // Nexmo Websocket Handler.

  let wSessionID = null;

  assistant.createSession({
    assistantId: process.env.ASSISTANT_ID
  }).then(res => {
    wSessionID = res.result.session_id;
    // get watson assistant to play welcome message to caller, sync callUUID, & provide caller phone number.
    assistant.message({
      assistantId: process.env.ASSISTANT_ID,
      sessionId: wSessionID,
      input: { 'text': 'Hello' },
      context: {
        'global': {
          'system': {
            'user_id': callUUID
          }
        },
        'skills': {
          'main skill': {
            'user_defined': {
              'caller_phone': caller,
              'callUUID': callUUID
            }
          }
        }
      }
    }).then(res => {
      console.log(JSON.stringify(res, null, 2));
      console.log('Darcel:', res.result.output.generic[0].text);
      // talk.start is a Nexmo function that takes text & plays it into the call as audio
      talk.start(callUUID, {
        text: res.result.output.generic[0].text
      }, (err => { console.log(err); }));
    }).catch(err => { console.log(err); });
  }).catch(err => { console.log(err); });

  // Static definition for code to call when audio is heard
  const recognizeStream = gSTTclient
    .streamingRecognize(gSTTparams) // googleSTT function
    .on('error', console.error)
    .on('data', data => { //data is text returned from google
      console.log(`${caller}: ${data.results[0].alternatives[0].transcript}`); //log for rTail
      // and send to watson assistant
      assistant.message({
        assistantId: process.env.ASSISTANT_ID,
        sessionId: wSessionID,
        input: { 'text': data.results[0].alternatives[0].transcript }
      }).then(res => { //res is result from Watson.
        console.log('Darcel:', res.result.output.generic[0].text);
        // and send to Nexmo TTS
        talk.start(callUUID, {
          text: res.result.output.generic[0].text
        }, (err => { console.log(err); }));
      }).catch(err => { console.log(err); });
    });

  ws.on('message', (msg) => {
    if (typeof msg === "string") {
      let config = JSON.parse(msg);
    } else {
      recognizeStream.write(msg);
    }
  });

  ws.on('close', () => {
    console.log('CALLER HUNG UP');
    recognizeStream.destroy();
  });
});

// api for watson to call via webhook for retrieving results from Algolia, Google Maps, and AskDarcel
app.post('/api/watson_webhook', async (req, res) => {
  console.log(req.body);
  switch (req.body.intent) {
    case 'neighborhood':
      const body = await got(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.neighborhood}%20San%20Francisco&key=${process.env.GOOGLE_API_KEY}`
      ).json();
      res.json(body.results[0].geometry.location);
      break;
    case 'search':
      index.search(req.body.category, {
        aroundLatLng: `${req.body.lat_lng.lat}, ${req.body.lat_lng.lng}`,
        hitsPerPage: 6,
        attributesToHighlight: [],
        attributesToRetrieve: ['name', '_geoloc', 'schedule', 'resource_schedule']
      }).then(({ hits }) => {
        hits.forEach(entry => {
          if (entry.schedule.length === 0) { entry.schedule = entry.resource_schedule; }
          delete entry['resource_schedule'];
        });
        res.json({ hits });
      });
      break;
    case 'read_list':
      let algoliaResults = await req.body.hits.hits;
      let formattedNameList = '';
      let i = 1;
      algoliaResults.forEach(singleResult => {
        formattedNameList += ` ${i}. ` + singleResult.name + ',';
        i++;
      });
      res.json({ string: formattedNameList });
      break;
    case 'get_details':
      let num = await req.body.result_number;
      let chosenResult = await req.body.algolia_results.hits[num - 1];
      let todayRaw = new Date();
      let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let today = weekday[todayRaw.getDay()];
      let tmrw = weekday[addDays(todayRaw, 1).getDay()];
      let formattedDetails = '';
      // find if has schedule
      if (chosenResult.schedule.length === 0) { // no open hours
        formattedDetails = `${num}. ${chosenResult.name} does not have any in-person hours. `;
      } else {
        // find if open today & tomorrow
        let scheduleToday = false; let scheduleTmrw = false;
        chosenResult.schedule.forEach(scheduleDay => {
          if (scheduleDay.day === today) { scheduleToday = scheduleDay; };
          if (scheduleDay.day === tmrw) { scheduleTmrw = scheduleDay; };
        });
        // format first part of string based on hours
        formattedDetails = `${num}. ${chosenResult.name} `;
        if (scheduleToday && scheduleTmrw) {
          formattedDetails += `hours today, ${today}, are ${scheduleToday.opens_at} to ${scheduleToday.closes_at} . Tomorrow, ${tmrw}, they're open ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at} . `;
        } else if (!scheduleToday && scheduleTmrw) { // closed today, open tmrw
          formattedDetails += `is closed today, but tomorrow, ${tmrw} , they're open ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at} . `;
        } else if (scheduleToday && !scheduleTmrw) { // closed tmrw, open today
          formattedDetails += `hours today, ${today}, are ${scheduleToday.opens_at} to ${scheduleToday.closes_at} . They're closed tomorrow, ${tmrw} . `;
        } else {
          formattedDetails += `has hours, but is closed today and tomorrow. `;
        } // Optionally, add later:
        // } else if ( open today but not open tomorrow so list 2nd day as after skipped ones )
        // } else if ( no hours today or tomorrow, next open after weekend or other skipped day )
      }
      // query google API for address from lat_lng and add to string if exists.
      // OPTIONALLY, INSTEAD, PULL THE FULL ADDRESS FROM ALGOLIA OR ASKDARCEL - it might be more accurate
      if (chosenResult._geoloc.lat) {
        const body = await got(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${chosenResult._geoloc.lat},${chosenResult._geoloc.lng}&result_type=street_address&key=${process.env.GOOGLE_API_KEY}`
        ).json();
        formattedDetails += `Their address is ${body.results[0].formatted_address}`;
      }
      res.json({ string: formattedDetails });
      break;
    // case 'text': text the user at the phone number they gave
    default:
      console.error("case not found, please include a valid value for the 'intent' key in the json parameters");
      res.status(404).json({ error: e });
      break;
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Service Orchestration Engine listening on port ${port}!`));
