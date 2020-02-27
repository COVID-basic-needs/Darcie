'use strict';
// load environment properties from a .env file for local development
require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressWs = require('express-ws')(app);
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
  // ws.on('message', (msg) => {
  //   if (typeof msg === 'string') {
  //     const config = JSON.parse(msg);
  //   } else {
  //     speechToText.recognize({
  //       audio: msg,
  //       contentType: 'audio/l16;rate=16000'
  //     }).then(text => console.log('text:', text)).catch(err => console.log('error:', err));
  //   }
  // });
  var stt = speechToText.recognizeUsingWebSocket({
    objectMode: false,
    contentType: 'audio/l16;rate=16000',
    model: 'en-US_BroadbandModel'
  });

  ws.on('open', function () {
    ws.pipe(stt);
    stt.setEncoding('utf8');
  });

  ws.on('close', () => {
    stt.destroy();
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
