'use strict';

require('dotenv').config();

const algoliasearch = require("algoliasearch");
const fs = require('fs');
const index = algoliasearch(
    process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_KEY
).initIndex(process.env.ALGOLIA_DARCIE_INDEX);

let locations = JSON.parse(fs.readFileSync('restrooms.json'));
let objects = [];

locations.forEach(location => {
    objects.push({
        'objectID': location.tma_facility_name + '-' + location.objectid,
        'address': location.address,
        'service': location.facility_type,
        'hours': '8am to 8pm',
        '_geoloc': {
            'lat': parseFloat(location.latitude),
            'lng': parseFloat(location.longitude),
        }
    });
});

index.saveObjects(objects, {
    autoGenerateObjectIDIfNotExist: true
});
