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
        let locations = JSON.parse(fs.readFileSync('Meal_Service_Locations.json')).features;
        let objects = [];

        for (const location of locations) {
            let body = await got(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${location.properties.Name}%20San%20Francisco&key=${process.env.GOOGLE_API_KEY}`
            ).json();
            objects.push({
                'objectID': location.properties.Name,
                'category': 'Food',
                'eligibilities': ['Families with Children', 'Youth'],
                'address': location.properties.Address.split(',')[0],
                'service': 'For Children up to age 18: Pick-up Breakfast, Lunch, & Supper (child must be present)',
                'hours': location.properties.Service_Days + ' ' + location.properties.Service_Hours,
                '_geoloc': {
                    'lat': body.results[0].geometry.location.lat,
                    'lng': body.results[0].geometry.location.lng
                }
            });
        };
        index.saveObjects(objects, {
            autoGenerateObjectIDIfNotExist: true
        });
    } catch (err) {
        console.error(err);
    }

};
anon();
