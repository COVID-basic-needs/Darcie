'use strict';

require('dotenv').config();

const algoliasearch = require("algoliasearch");
const fs = require('fs');
const got = require('got');
const index = algoliasearch(
    process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_KEY
).initIndex(process.env.ALGOLIA_DARCIE_INDEX);

async function anon() {
    try {
        let locations = JSON.parse(fs.readFileSync('food94103.json'));

        for (const location of locations) {
            let body = await got(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${location.address}%20San%20Francisco&key=${process.env.GOOGLE_API_KEY}`
            ).json();
            location._geoloc = {
                'lat': body.results[0].geometry.location.lat,
                'lng': body.results[0].geometry.location.lng
            };
        };

        index.saveObjects(locations, {
            autoGenerateObjectIDIfNotExist: true
        });
    } catch (err) {
        console.error(err);
    }

};
anon();
