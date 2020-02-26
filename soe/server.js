'use strict';
// load environment properties from a .env file for local development
require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressWs = require('express-ws')(app);

const Nexmo = require('nexmo');
const { Readable } = require('stream').Readable;

const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.SPEECH_TO_TEXT_IAM_APIKEY
  }),
  url: process.env.SPEECH_TO_TEXT_URL
});

// const speech = require('@google-cloud/speech');
// // use GOOGLE_APPLICATION_CREDENTIALS to point to the info google-cloud/speech needs
// const client = new speech.SpeechClient(null);

const inStream = new Readable({
  read () {}
});

const nexmo = new Nexmo({
  apiKey: 'dummy',
  apiSecret: 'dummy',
  applicationId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY || './private.key'
});

app.use(bodyParser.json());

app.get('/ncco', (req, res) => {
  const nccoResponse = [
    {
      action: 'connect',
      endpoint: [{
        type: 'websocket',
        'content-type': 'audio/l16;rate=16000',
        uri: `ws://${req.hostname}/socket`
      }]
    }
  ];

  res.status(200).json(nccoResponse);
});

app.post('/event', (req, res) => {
  console.log('EVENT LOG::', req.body);
  res.status(204).end();
});

// Nexmo Websocket Handler
app.ws('/socket', (ws, req) => {
  if (typeof msg === 'string') {
    const config = JSON.parse(msg);
  } else {
    ws.pipe(speechToText.recognizeUsingWebSocket({
      contentType: 'audio/l16;rate=16000',
      interimResults: true,
      inactivityTimeout: -1
    })).setEncoding('utf8');
  }
  // on('message', (msg) => {
  //     console.log('Hi from within on(message).');
  //     inStream.push(msg);
  //     inStream.
  //   }
  // });

  // ws.on('close', () => {
  //   inStream.end();
  // });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
