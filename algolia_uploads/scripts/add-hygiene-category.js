'use strict';

require('dotenv').config();

const algoliasearch = require("algoliasearch");
const fs = require('fs');
const index = algoliasearch(
    process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_KEY
).initIndex(process.env.ALGOLIA_DARCIE_INDEX);

let pitstops = JSON.parse(fs.readFileSync('../misc/Pit_Stops__Hand_Washing_Stations.json')).features;
let restrooms = JSON.parse(fs.readFileSync('restrooms.json'));
let objects = [];

pitstops.forEach(location => {
    objects.push({
        'objectID': location.properties.Label,
        'category': 'Hygiene'
    });
});

restrooms.forEach(location => {
    objects.push({
        'objectID': location.tma_facility_name + '-' + location.objectid,
        'category': 'Hygiene'
    });
});

index.partialUpdateObjects(objects);
