'use strict';

require('dotenv').config();

const algoliasearch = require("algoliasearch");
const Firestore = require('@google-cloud/firestore');
const fs = require('fs');
const got = require('got');
const db = new Firestore({
    projectId: process.env.GOOGLE_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const index = algoliasearch(
    process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY
).initIndex(process.env.ALGOLIA_INDEX);

let locations = JSON.parse(fs.readFileSync('../misc/Pit_Stops__Hand_Washing_Stations.json')).features;
// console.log(locations[0]);
locations.forEach(location => {
    db.collection('covid-hygiene').doc(location.properties.Label).set({
    name: location.properties.Name,
    service: location.properties.Site_Type,
    hours: location.properties.Hours_of_Operation,
    lat: location.properties.Latitude,
    long: location.properties.Longitude
    });
});

