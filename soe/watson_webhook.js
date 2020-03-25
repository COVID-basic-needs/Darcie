// This is a backup of our Google Cloud Function deployed at:
//   https://us-central1-vacs-1581499154312.cloudfunctions.net/waston-webhook
//
// To make edits, visit the console at:
//   https://console.cloud.google.com/functions/list?project=vacs-1581499154312

const algoliasearch = require("algoliasearch");
// const addDays = require('date-fns/addDays');
// const utcToZonedTime = require('date-fns-tz/utcToZonedTime');
const got = require('got');
const index = algoliasearch(
    process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY
).initIndex(process.env.ALGOLIA_INDEX);

// api for watson to call via webhook for retrieving results from Algolia, Google Maps, & AskDarcel, and prompting SMS.
exports.watson_webhook = async (req, res) => {

    let num; let chosenResult;

    switch (req.body.intent) {

        case 'search': // takes a SF neighborhood & a category and does a search in the Algolia index
            const body = await got(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.neighborhood}%20San%20Francisco&key=${process.env.GOOGLE_API_KEY}`
            ).json();
            const lat_lng = body.results[0].geometry.location;

            // Algolia search the given category and location
            await index.search('', {
                filters: `category:${req.body.category}`,
                aroundLatLng: `${lat_lng.lat}, ${lat_lng.lng}`,
                hitsPerPage: 6,
                attributesToHighlight: [],
                attributesToRetrieve: ['*']
            }).then(({ hits }) => {
                let formattedNameList = '';
                let i = 1;
                // formats the service names in the algolia_results for reading to the caller
                hits.forEach(singleResult => {
                    formattedNameList += ` ${i}. ` + singleResult.service + ' at ' + singleResult.address + ',';
                    i++;
                });
                // if there's no caller phone number, we are debugging, so text Max
                if (!req.body.caller_phone) {
                    res.json({ hits, string: formattedNameList, debug_phone: 5109935073, readable_phone: '5-1-0-9-9-3-5-0-7-3' });
                } else { // makes a readable phone number seperated by dashes
                    res.json({ hits, string: formattedNameList, readable_phone: req.body.caller_phone.split('').join('-') });
                }
            });
            break;

        case 'get_details': // takes a result_number and the algolia_results, then gets and formats more details on the numbered Service
            num = await req.body.result_number;
            chosenResult = await req.body.algolia_results.hits[num - 1];
            //             let todayRaw = utcToZonedTime(new Date(), 'America/Los_Angeles');
            //             let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            //             let today = weekday[todayRaw.getDay()];
            //             let tmrw = weekday[addDays(todayRaw, 1).getDay()];
            let formattedDetails = null, formattedHours = null, address = null, place_id = null;
            //             // find if has schedule, i.e. check if there's any open hours on any schedule
            //             if (!chosenResult || !chosenResult.schedule || chosenResult.schedule.length === 0) {
            //                 formattedDetails = `${num}. ${chosenResult.name} does not have any in-person hours. `;
            //             } else {
            //                 // find if open today & tomorrow
            //                 let scheduleToday = false; let scheduleTmrw = false;
            //                 chosenResult.schedule.forEach(scheduleDay => {
            //                     if (scheduleDay.day === today) {
            //                         scheduleToday = scheduleDay;
            //                         scheduleToday.opens_at = scheduleToday.opens_at.toString().slice(0, -2) + ':' + scheduleToday.opens_at.toString().slice(-2);
            //                         scheduleToday.closes_at = scheduleToday.closes_at.toString().slice(0, -2) + ':' + scheduleToday.closes_at.toString().slice(-2);
            //                     };
            //                     if (scheduleDay.day === tmrw) {
            //                         scheduleTmrw = scheduleDay;
            //                         scheduleTmrw.opens_at = scheduleTmrw.opens_at.toString().slice(0, -2) + ':' + scheduleTmrw.opens_at.toString().slice(-2);
            //                         scheduleTmrw.closes_at = scheduleTmrw.closes_at.toString().slice(0, -2) + ':' + scheduleTmrw.closes_at.toString().slice(-2);
            //                     };
            //                 });
            //                 // format first part of strings based on hours
            //                 formattedDetails = `${num}. ${chosenResult.name} `;
            //                 if (scheduleToday && scheduleTmrw) {
            //                     formattedDetails += `hours today, ${today}, are ${scheduleToday.opens_at} to ${scheduleToday.closes_at}. Tomorrow, ${tmrw}, they're open ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at}. `;
            //                     formattedHours = `${today}: ${scheduleToday.opens_at} to ${scheduleToday.closes_at}
            // ${tmrw}: ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at}`;
            //                 } else if (!scheduleToday && scheduleTmrw) { // closed today, open tmrw
            //                     formattedDetails += `is closed today, but tomorrow, ${tmrw} , they're open ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at} . `;
            //                     formattedHours = `${today}: closed
            // ${tmrw}: ${scheduleTmrw.opens_at} to ${scheduleTmrw.closes_at}`;
            //                 } else if (scheduleToday && !scheduleTmrw) { // closed tmrw, open today
            //                     formattedDetails += `hours today, ${today}, are ${scheduleToday.opens_at} to ${scheduleToday.closes_at}. They're closed tomorrow, ${tmrw}. `;
            //                     formattedHours = `${today}: ${scheduleToday.opens_at} to ${scheduleToday.closes_at}
            // ${tmrw}: closed`;
            //                 } else {
            //                     formattedDetails += `has hours, but is closed today and tomorrow. `;
            //                     formattedHours = `closed ${today} and ${tmrw}`;
            //                 } // Optionally, add later:
            //                 // } else if ( open today but not open tomorrow ) list 2nd day as after skipped ones
            //                 // } else if ( no hours today or tomorrow ) say 'next open' after skipped days
            //             }
            //             // query google API for address from lat_lng & add to string if exists.
            //             // OPTIONALLY, INSTEAD, PULL THE FULL ADDRESS FROM ALGOLIA OR ASKDARCEL - it might be more accurate
            //             if (chosenResult._geoloc.lat) {
            //                 try {
            //                     const apiRes = await got(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${chosenResult._geoloc.lat},${chosenResult._geoloc.lng}&result_type=street_address&key=${process.env.GOOGLE_API_KEY}`).json();
            //                     if (await apiRes.status === 'OK') {
            //                         const firstRes = await apiRes.results[0];
            //                         place_id = await firstRes.place_id;
            //                         address = await firstRes.formatted_address.split(',').slice(0, 2).join(',');
            //                         formattedDetails += `Their address is ${address}`;
            //                     } else { console.log('No Google Maps API results.'); }
            //                 } catch (err) { console.log('GOOGLE MAPS API ERROR:', err); }
            //             }

            formattedDetails = `${num}. The ${chosenResult.service} at ${chosenResult.address} is open ${chosenResult.hours}.`;
            res.json({ string: formattedDetails });
            break;

        case 'send_SMS_text': // text the user at the phone number they gave
            num = await req.body.result_number;
            chosenResult = await req.body.algolia_results.hits[num - 1];
            let phoneToText = await req.body.phone_to_text.toString().replace(/\D/g, '');
            let sender = process.env.NEXMO_PHONE;
            let recipient = (phoneToText.length > 10) ? phoneToText : '1' + phoneToText;
            let options = { type: 'unicode' };
            let googleMapsLink = `www.google.com/maps/dir//${chosenResult._geoloc.lat},${chosenResult._geoloc.lng}`;

            // let objectID = chosenResult.objectID.split('_');
            // if (objectID[0] === 'resource') { // call AskDarcel API for servicePhone
            //     object = await got(`https://askdarcel.org/api/resources/${objectID[1]}`).json();
            //     if (object.resource.phones[0]) {
            //         servicePhone = await object.resource.phones[0].number;
            //     }
            // } else {
            //     object = await got(`https://askdarcel.org/api/services/${objectID[1]}`).json();
            //     if (object.service.resource.phones[0]) {
            //         servicePhone = await object.service.resource.phones[0].number;
            //     }
            // }
            // if (chosenResult._geoloc.lat) { // form google maps search link
            //     googleMapsLink = `https://google.com/maps/search/?api=1&query=${chosenResult._geoloc.lat}%2C${chosenResult._geoloc.lng}`;
            //     if (req.body.details.place_id) {
            //         googleMapsLink += `&query_place_id=${req.body.details.place_id}`;
            //     }
            // } else if (req.body.details.place_id) {
            //     googleMapsLink = `https://google.com/maps/search/?api=1&query=null&query_place_id=${req.body.details.place_id}`;
            // }
            // if (objectID[0] === 'resource') { // form sfServiceGuide link
            //     sfServiceGuideLink = `https://sfserviceguide.org/organizations/${objectID[1]}`;
            // } else {
            //     sfServiceGuideLink = `https://sfserviceguide.org/services/${objectID[1]}`;
            // }
            //             let message = `Search: Hygiene near ${req.body.neighborhood}
            // ${num}. ${chosenResult.name}`;
            //             if (req.body.details.address) message += `
            // ${req.body.details.address}`;
            //             if (servicePhone) message += `
            // ${servicePhone}`;
            //             if (req.body.details.hours) message += `
            // ${req.body.details.hours}`;
            //             message += `

            // ${googleMapsLink}

            // More details on the SF Service Guide:
            // ${sfServiceGuideLink}
            //   - Darcie @ ShelterTech`;
            let message = `${num}. ${chosenResult.service} in ${req.body.neighborhood}
Address: ${chosenResult.address}
Hours: ${chosenResult.hours}
Map: ${googleMapsLink}
 - Darcie @ www.ShelterTech.org`;
            // sends the above parameters to the App Engine component, which
            //   has the nexmo credentials to send the text & pipe to rTail.
            smsStatus = await got.post(
                'https://vacs-1581499154312.appspot.com/text_sms',
                {
                    json: {
                        sender,
                        recipient,
                        message,
                        options,
                        'callUUID': req.body.callUUID
                    },
                    responseType: 'json'
                },
                (err) => { if (err) console.log(err); }
            ).json();
            if (smsStatus.sent) {
                res.json({ sent: true });
            } else {
                res.json({ error: true });
            }
            break;

        default:
            console.error("ERROR: case not found, please include a valid value for the 'intent' key in the json parameters");
            res.status(404).json({ error: e });
            break;
    }
};