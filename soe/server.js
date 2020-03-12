'use strict';
// require('dotenv').config(); // ** UNCOMMENT FOR LOCAL DEVELOPMENT **

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

const assistant = new AssistantV2({
  version: '2020-02-05',
  authenticator: new IamAuthenticator({ apikey: process.env.WA_APIKEY })
});
const gSTTclient = new gSpeech.SpeechClient(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const gSTTparams = { // static parameters google speech-to-text needs.
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: process.env.LANG_CODE || 'en-US'
  },
  interimResults: false
};
const index = algoliasearch(
  process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY
).initIndex(process.env.ALGOLIA_INDEX);
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APP_ID,
  privateKey: process.env.PRIVATE_KEY || './private.key'
});
const voiceName = 'Eric';
let caller = null;   // caller's phone number.
let callUUID = null; // unique ID of this phone call session.


app.use(bodyParser.json());

app.get('/ncco', (req, res) => { // ncco = Nexmo Call Control Object: the data needed to forward the call.
  let nccoResponse = [{
    "action": "connect",
    "endpoint": [{
      "type": "websocket",
      "content-type": "audio/l16;rate=16000",
      "uri": `wss://${process.env.SOE_URL}/socket` // ** CHANGE TO ws:// FOR LOCAL DEVELOPMENT **
    }]
  }];
  res.status(200).json(nccoResponse);
});

app.post('/event', (req, res) => { // whenever something happends on the Nexmo side of the call it uses this to update us.
  if (req.body.from !== 'Unknown') {
    caller = req.body.from;
    callUUID = req.body.uuid;
  }
  console.log('EVENT from', caller, 'to', req.body.to, req.body.status, `<${callUUID}>`);
  res.status(204).end();
});

// api for watson to call via webhook for retrieving results from Algolia, Google Maps, & AskDarcel, and prompting SMS.
app.post('/api/watson_webhook', async (req, res) => {

  // console.log(req.body); // DEBUGGER
  let num; let chosenResult;

  switch (req.body.intent) {

    case 'search': // takes a SF neighborhood & a category and does a search in the Algolia index
      const body = await got(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.neighborhood}%20San%20Francisco&key=${process.env.GOOGLE_API_KEY}`
      ).json();
      const lat_lng = body.results[0].geometry.location;

      // Algolia search the given category and location
      await index.search(req.body.category, {
        aroundLatLng: `${lat_lng.lat}, ${lat_lng.lng}`,
        hitsPerPage: 6,
        attributesToHighlight: [],
        attributesToRetrieve: ['name', '_geoloc', 'schedule', 'resource_schedule']
      }).then(({ hits }) => {
        // merge schedules, if the entry is a resource then use the resource_schedule, then delete resource_schedule field
        hits.forEach(entry => {
          if (entry.schedule.length === 0) { entry.schedule = entry.resource_schedule; }
          delete entry['resource_schedule'];
        });
        // if there's no caller phone number, we are debugging, so text Max
        if (!req.body.caller_phone) {
          res.json({ hits, debug_phone: 5109935073, readable_phone: '5-1-0-9-9-3-5-0-7-3' });
        } else { // makes a readable phone number seperated by dashes
          res.json({ hits, readable_phone: req.body.caller_phone.split('').join('-') });
        }
      });
      break;

    case 'read_list': // formats the service names in the algolia_results for reading to the caller
      let algoliaResults = await req.body.algolia_results.hits;
      let formattedNameList = '';
      let i = 1;
      algoliaResults.forEach(singleResult => {
        formattedNameList += ` ${i}. ` + singleResult.name + ',';
        i++;
      });
      res.json({ string: formattedNameList });
      break;

    case 'get_details': // takes a result_number and the algolia_results, then gets and formats more details on the numbered Service
      num = await req.body.result_number;
      chosenResult = await req.body.algolia_results.hits[num - 1];
      let todayRaw = new Date();
      let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let today = weekday[todayRaw.getDay()];
      let tmrw = weekday[addDays(todayRaw, 1).getDay()];
      let formattedDetails = null, formattedHours = null, address = null, place_id = null;
      // find if has schedule, i.e. check if there's any open hours on any schedule
      if (!chosenResult || !chosenResult.schedule || chosenResult.schedule.length === 0) {
        formattedDetails = `${num}. ${chosenResult.name} does not have any in-person hours. `;
      } else {
        // find if open today & tomorrow
        let scheduleToday = false; let scheduleTmrw = false;
        chosenResult.schedule.forEach(scheduleDay => {
          if (scheduleDay.day === today) { scheduleToday = scheduleDay; };
          if (scheduleDay.day === tmrw) { scheduleTmrw = scheduleDay; };
        });
        // format first part of strings based on hours
        formattedDetails = `${num}. ${chosenResult.name} `;
        if (scheduleToday && scheduleTmrw) {
          formattedDetails += `hours today, ${today}, are ${scheduleToday.opens_at} to ${scheduleToday.closes_at}. Tomorrow, ${tmrw}, they're open ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at}. `;
          formattedHours = `${today}: ${scheduleToday.opens_at} to ${scheduleToday.closes_at}
${tmrw}: ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at}`;
        } else if (!scheduleToday && scheduleTmrw) { // closed today, open tmrw
          formattedDetails += `is closed today, but tomorrow, ${tmrw} , they're open ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at} . `;
          formattedHours = `${today}: closed
${tmrw}: ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at}`;
        } else if (scheduleToday && !scheduleTmrw) { // closed tmrw, open today
          formattedDetails += `hours today, ${today}, are ${scheduleToday.opens_at} to ${scheduleToday.closes_at}. They're closed tomorrow, ${tmrw}. `;
          formattedHours = `${today}: ${scheduleToday.opens_at} to ${scheduleToday.closes_at}
${tmrw}: closed`;
        } else {
          formattedDetails += `has hours, but is closed today and tomorrow. `;
          formattedHours = `closed ${today} and ${tmrw}`;
        } // Optionally, add later:
        // } else if ( open today but not open tomorrow ) list 2nd day as after skipped ones
        // } else if ( no hours today or tomorrow ) say 'next open' after skipped days
      }
      // query google API for address from lat_lng & add to string if exists.
      // OPTIONALLY, INSTEAD, PULL THE FULL ADDRESS FROM ALGOLIA OR ASKDARCEL - it might be more accurate
      if (chosenResult._geoloc.lat) {
        try {
          const apiRes = await got(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${chosenResult._geoloc.lat},${chosenResult._geoloc.lng}&result_type=street_address&key=${process.env.GOOGLE_API_KEY}`).json();
          // console.log(apiRes); // DEBUGGER
          if (await apiRes.status === 'OK') {
            const firstRes = await apiRes.results[0];
            place_id = await firstRes.place_id;
            address = await firstRes.formatted_address.split(',').slice(0, 2).join(',');
            formattedDetails += `Their address is ${address}`;
          } else { console.log('No Google Maps API results.'); }
        } catch (err) { console.log('GOOGLE MAPS API ERROR:', err); }
      }
      res.json({ string: formattedDetails, hours: formattedHours, address: address, place_id: place_id });
      break;

    case 'send_SMS_text': // text the user at the phone number they gave
      num = await req.body.result_number;
      chosenResult = await req.body.algolia_results.hits[num - 1];
      // console.log('phone_to_text:', req.body.phone_to_text); // DEBUGGER
      let phoneToText = await req.body.phone_to_text.toString().replace(/\D/g, '');
      // console.log('phoneToText:', phoneToText); // DEBUGGER
      let sender = process.env.NEXMO_PHONE;
      let recipient = (phoneToText.length > 10) ? phoneToText : '1' + phoneToText;
      let options = { type: 'unicode' };
      let servicePhone = null, googleMapsLink = null, sfServiceGuideLink = null, object = null;
      let objectID = chosenResult.objectID.split('_');

      if (objectID[0] === 'resource') { // call AskDarcel API for servicePhone
        object = await got(`https://askdarcel.org/api/resources/${objectID[1]}`).json();
        servicePhone = await object.resource.phones[0].number;
      } else {
        object = await got(`https://askdarcel.org/api/services/${objectID[1]}`).json();
        servicePhone = await object.service.resource.phones[0].number;
      }

      if (chosenResult._geoloc.lat) { // form google maps search link
        googleMapsLink = `https://google.com/maps/search/?api=1&query=${chosenResult._geoloc.lat}%2C${chosenResult._geoloc.lng}`;
        if (req.body.details.place_id) {
          googleMapsLink += `&query_place_id=${req.body.details.place_id}`;
        }
      } else if (req.body.details.place_id) {
        googleMapsLink = `https://google.com/maps/search/?api=1&query=null&query_place_id=${req.body.details.place_id}`;
      }

      if (objectID[0] === 'resource') { // form sfServiceGuide link
        sfServiceGuideLink = `https://sfserviceguide.org/organizations/${objectID[1]}`;
      } else {
        sfServiceGuideLink = `https://sfserviceguide.org/services/${objectID[1]}`;
      }

      let message = `Search: Hygiene near ${req.body.neighborhood}
${num}. ${chosenResult.name}`;
      if (req.body.details.address) message += `
${req.body.details.address}`;
      if (servicePhone) message += `
${servicePhone}`;
      if (req.body.details.hours) message += `
${req.body.details.hours}`;
      message += `

${googleMapsLink}

More details on the SF Service Guide:
${sfServiceGuideLink}
 - Darcie @ ShelterTech`;
      // console.log('nexmo.message.sendSms(sender, recipient, message, options:', sender, recipient, message, options); // DEBUGGER
      nexmo.message.sendSms(sender, recipient, message, options, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]['status'] === "0") {
            console.log(`SMS SENT TO ${recipient}:
${message}`);
            res.json({ sent: true });
          } else {
            console.log(`ERROR ON SMS ATTEMPT TO ${recipient}: ${responseData.messages[0]['error-text']}`);
            res.json({ error: true });
          }
        }
      });
      break;

    default:
      console.error("ERROR: case not found, please include a valid value for the 'intent' key in the json parameters");
      res.status(404).json({ error: e });
      break;
  }
});

app.ws('/socket', (ws, req) => { // Nexmo Websocket Handler.

  let wSessionID = null;

  assistant.createSession({
    assistantId: process.env.WA_ID
  }).then(res => {
    wSessionID = res.result.session_id;
    // get watson assistant to play welcome message to caller, sync callUUID, & provide caller phone number.
    assistant.message({
      assistantId: process.env.WA_ID,
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
              'caller_phone': caller.toString(),
              'callUUID': callUUID
            }
          }
        }
      }
    }).then(res => {
      // console.log(JSON.stringify(res, null, 2));
      console.log('Darcie:', res.result.output.generic[0].text);
      // Nexmo TTS function that takes text & plays it into the call as audio
      nexmo.calls.talk.start(callUUID, {
        text: res.result.output.generic[0].text,
        voice_name: voiceName
      }, (err => { if (err) console.log(err); }));
    }).catch(err => { console.log(err); });
  }).catch(err => { console.log(err); });

  // Definition for code to call when audio is heard - static but based on sessionId.
  const recognizeStream = gSTTclient
    .streamingRecognize(gSTTparams) // googleSTT function
    .on('error', console.error)
    .on('data', data => { // data is text returned from google
      console.log(`${caller}: ${data.results[0].alternatives[0].transcript}`); // log for rTail
      assistant.message({ // and send to watson assistant
        assistantId: process.env.WA_ID,
        sessionId: wSessionID,
        input: { 'text': data.results[0].alternatives[0].transcript }
      }).then(async res => { // res is result from Watson.
        // console.log('DEBUG-WATSON-RESPONSE-OBJ:', res.result);
        console.log('Darcie:', res.result.output.generic[0].text);
        await nexmo.calls.talk.start(callUUID, { // and send to Nexmo TTS
          text: res.result.output.generic[0].text,
          voice_name: voiceName
        }, (err => { if (err) console.log(err); })
        );
      }).catch(err => { console.log(err); });
    });

  // when an audio message is heard, execute the google STT object and its callback chain returning Watson dialog to Nexmo
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

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Service Orchestration Engine listening on port ${port}!`));
