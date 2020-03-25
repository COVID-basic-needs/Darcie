'use strict';

require('dotenv').config();

const algoliasearch = require("algoliasearch");
const fs = require('fs');
const index = algoliasearch(
    process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_KEY
).initIndex(process.env.ALGOLIA_DARCIE_INDEX);

let locations = JSON.parse(fs.readFileSync('../misc/Pit_Stops__Hand_Washing_Stations.json')).features;
let objects = [];

locations.forEach(location => {
    objects.push({
        'objectID': location.properties.Label,
        'address': location.properties.Name,
        'service': location.properties.Site_Type,
        'hours': location.properties.Hours_of_Operation,
        '_geoloc': {
            'lat': parseFloat(location.properties.Latitude),
            'lng': parseFloat(location.properties.Longitude),
        }
    });
});

index.saveObjects(objects, {
    autoGenerateObjectIDIfNotExist: true
});
