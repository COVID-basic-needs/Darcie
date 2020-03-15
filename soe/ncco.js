// This is a backup of our Google Cloud Function deployed at:
//   https://us-central1-vacs-1581499154312.cloudfunctions.net/vacs-ncco
//
// To make edits, visit the console at:
//   https://console.cloud.google.com/functions/list?project=vacs-1581499154312
//
// ncco = Nexmo Call Control Object: the data needed to forward the call.

exports.ncco = (req, res) => {

    let nccoResponse = [{
        "action": "connect",
        "from": req.query.to, // the number responding to the call
        "endpoint": [{
            "type": "websocket",
            "content-type": "audio/l16;rate=16000",
            "uri": `wss://${process.env.SOE_URL}/socket`,
            "headers": { // these are custom, they're for the wss:/SOE/socket and /event to have and pass to Watson
                "uuid": req.query.uuid,
                "to": req.query.to,
                "caller": req.query.from
            }
        }]
    }];

    res.status(200).json(nccoResponse);

};