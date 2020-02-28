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
// console.log("STT Object: ", speechToText)
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
  // console.log('EVENT LOG::', req.body);
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
  let stt = speechToText.recognizeUsingWebSocket({
    objectMode: true,
    contentType: 'audio/l16;rate=16000',
    model: 'en-US_BroadbandModel'
  });
  //console.log("STT:", stt);
  //console.log("WS:", ws);
  // ws.on('connect', function () {
  //   console.log("Hello connect");
  // });
  // ws.on('open', function () {
  //   console.log("Hello open");
  // });

  stt.on('data', function(event) { onEvent('Data:', event); });
  stt.on('error', function(event) { onEvent('Error:', event); });
  stt.on('close', function(event) { onEvent('Close:', event); });
  function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));
  };
  const dupleStream = WebSock.createWebSocketStream(ws, { encoding: 'BASE64' });
  dupleStream.pipe(stt);
    // ws.on('message', function () {
    // stt.pipe(fs.createWriteStream('test.out'));
    // fs.writeSync(1, 'TESTOUT-DATA');
    // fs.writeSync(1, fs.readFileSync('test.out'));
    
    // Displays events on the console.
  // });


  // ws.on('close', () => {
  //   // fs.writeSync(1, 'TESTOUT-close');
  //   // fs.writeSync(1, fs.readFileSync('test.out'));
  //   stt.destroy();
  // });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
