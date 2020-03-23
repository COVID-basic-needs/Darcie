'use strict';
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config(); // For local, non-gcloud development, this pulls from .env - see example.env
}                               // If using google app engine, add ENVs in the app.yaml - see soe/example.app.yaml
const Firestore = require('@google-cloud/firestore');
const gSpeech = require('@google-cloud/speech');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app); // This enables the websocket route: app.ws(, line 108
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const Nexmo = require('nexmo');
const { Readable } = require('stream'); // This enables the websocket route: app.ws(, line 108

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
const db = new Firestore({
    projectId: process.env.GOOGLE_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APP_ID,
    privateKey: process.env.PRIVATE_KEY || './private.key'
});
const voiceName = process.env.VOICE_NAME || 'Eric';


app.use(bodyParser.json());

app.post('/event', (req, res) => { // whenever something happends on the Nexmo side of the call it uses this to update us.
    let docRef = db.collection('calls').doc(req.body.conversation_uuid);
    if (req.body.status === 'started' && req.body.direction === 'inbound') {
        docRef.set(
            {
                'started': req.body.timestamp,
                'from': req.body.from
            },
            {
                merge: true
            }
        );
    } else if (req.body.status === 'completed' && req.body.direction === 'inbound') {
        docRef.set(
            {
                'duration': req.body.duration,
                'price': req.body.price
            },
            {
                merge: true
            }
        );
    } else if (req.body.recording_url) {
        docRef.set(
            {
                'recording_size': req.body.size,
                'recording_url': req.body.recording_url
            },
            {
                merge: true
            }
        );
    }
    docRef.collection('EVENTS').doc(req.body.timestamp).set(req.body);
    if (req.body.direction === 'inbound') {
        console.log(req.body.from, req.body.status, `<${req.body.conversation_uuid}>`);
    }
    res.status(204).end();
});

app.post('/text_sms', (req, res) => {
    nexmo.message.sendSms(
        req.body.sender,
        req.body.recipient,
        req.body.message,
        req.body.options,
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log(`SMS SENT TO ${req.body.recipient}:
${req.body.message}`);
                    if (req.body.callUUID) {
                        db.collection('calls').doc(req.body.callUUID).set({ text_sent: true }, { merge: true });
                    }
                    res.json({ sent: true });
                } else {
                    console.log(`ERROR ON SMS ATTEMPT TO ${req.body.recipient}: ${responseData.messages[0]['error-text']}`);
                    res.json({ error: true });
                }
            }
        }
    );
});

app.ws('/socket', (ws, req) => { // Nexmo Websocket Handler.

    let wSessionID = null;
    let caller = null;   // caller's phone number.
    let callUUID = null; // unique ID of this phone call session.
    let legUUID = null;  // unique ID of this leg of the phone call.
    let tik = 0;
    // Definition for code to call when audio is heard - static but based on sessionId.
    const recognizeStream = gSTTclient
        .streamingRecognize(gSTTparams) // googleSTT function
        .on('error', console.error)
        .on('data', data => { // data is text returned from google
            let userResponse = data.results[0].alternatives[0].transcript;
            db.collection('calls').doc(callUUID).set({
                dialog: { [`caller(${tik})`]: userResponse },
                rawDialog: { [`caller(${tik})`]: data.results[0] }
            }, { merge: true });
            tik++;
            console.log(`${caller}: ${userResponse}`); // log for rTail
            assistant.message({ // and send to watson assistant
                assistantId: process.env.WA_ID,
                sessionId: wSessionID,
                input: { 'text': userResponse }
            }).then(async res => { // res is result from Watson.
                let watsonResponse = res.result.output.generic[0].text;
                db.collection('calls').doc(callUUID).set({
                    dialog: { [`watson(${tik})`]: watsonResponse },
                    rawDialog: { [`watson(${tik})`]: res.result.output }
                }, { merge: true });
                console.log('Darcie:', watsonResponse);
                await nexmo.calls.talk.start(legUUID, { // and send to Nexmo TTS
                    text: watsonResponse,
                    voice_name: voiceName
                }, (err => { if (err) console.log(err); })
                );
            }).catch(err => { console.log(err); });
        });

    // when an audio message is heard, execute the google STT object and its callback chain returning Watson dialog to Nexmo
    ws.on('message', (msg) => {
        if (typeof msg === "string") { // string msg is the initial connect, delivering custom headers from /ncco
            let config = JSON.parse(msg);
            caller = config.caller;
            callUUID = config.conversation_uuid;
            legUUID = config.uuid;
            assistant.createSession({ // initializes a watson assistant session
                assistantId: process.env.WA_ID
            }).then(res => {
                wSessionID = res.result.session_id;
                // get watson assistant to play welcome message to caller, sync callUUID, & provide caller phone number.
                assistant.message({
                    assistantId: process.env.WA_ID,
                    sessionId: wSessionID,
                    input: { 'text': 'Hello' },
                    context: {
                        'global': { 'system': { 'user_id': callUUID } },
                        'skills': {
                            'main skill': {
                                'user_defined': {
                                    'caller_phone': caller.toString(),
                                    'callUUID': callUUID,
                                    'legUUID': legUUID
                                }
                            }
                        }
                    }
                }).then(res => {
                    console.log('Darcie:', res.result.output.generic[0].text);
                    // Nexmo TTS function that takes text & plays it into the call as audio
                    nexmo.calls.talk.start(legUUID, {
                        text: res.result.output.generic[0].text,
                        voice_name: voiceName
                    }, (err => { if (err) console.log(err); }));
                }).catch(err => { console.log(err); });
            }).catch(err => { console.log(err); });
        } else { // if msg isn't a string it's binary audio, so this streams it to the GSTT function declared above, which in turn does the rest
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
