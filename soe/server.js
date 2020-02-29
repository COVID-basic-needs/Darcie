'use strict';
// load environment properties from a .env file for local development
require('dotenv').load();

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressWs = require('express-ws')(app);
const WebSock = require('ws');
// const Nexmo = require('nexmo');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.SPEECH_TO_TEXT_IAM_APIKEY
  }),
  url: process.env.SPEECH_TO_TEXT_URL
});
// const nexmo = new Nexmo({
//   apiKey: 'dummy',
//   apiSecret: 'dummy',
//   applicationId: process.env.APP_ID,
//   privateKey: process.env.PRIVATE_KEY || './private.key'
// });
app.use(bodyParser.json());
 
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

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
  // console.log('EVENT LOG::', req.body);
  res.status(204).end();
});

// Nexmo Websocket Handler
app.ws('/socket', (ws, req) => {
  console.log('socket', req.testing);
  ws.on('message', function (msg) {
    if (typeof msg === "string") {
      let config = JSON.parse(msg);
    } else {
      speechToText.recognize({
        audio: msg,
        contentType: 'audio/l16;rate=16000',
        model: 'en-US_BroadbandModel'
      }).then(results => {
        console.log(JSON.stringify(results, null, 2));
      }).catch(err => {
        console.log('error:', err);
      });
    }
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
