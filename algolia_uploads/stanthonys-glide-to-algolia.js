'use strict';
 
require('dotenv').config();

const algoliasearch = require("algoliasearch");
const got = require('got');
const index = algoliasearch(
    process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_KEY
).initIndex(process.env.ALGOLIA_DARCIE_INDEX);

async function anon() {
    try {
        let body = await got(
            `https://maps.googleapis.com/maps/api/geocode/json?address=45%20Jones%20Street%20San%20Francisco&key=${process.env.GOOGLE_API_KEY}`
        ).json();
        let objects = [
            {
                'objectID': "St Anthony’s 10am",
                'category': 'Food',
                'eligibilities': ['Seniors', 'Families with Children', 'Youth'],
                'address': '45 Jones Street (at Golden Gate Ave.)',
                'service': '1 free meal per person',
                'hours': 'Daily: 10:00am-11:45am',
                '_geoloc': {
                    'lat': body.results[0].geometry.location.lat,
                    'lng': body.results[0].geometry.location.lng
                }
            },
            {
                'objectID': "St Anthony’s 11:30am",
                'category': 'Food',
                'eligibilities': ['All'],
                'address': '45 Jones St. (at Golden Gate Ave.)',
                'service': '1 free meal per person',
                'hours': 'Daily: 11:30am-1:30pm',
                '_geoloc': {
                    'lat': body.results[0].geometry.location.lat,
                    'lng': body.results[0].geometry.location.lng
                }
            }
        ];

        let body2 = await got(
            `https://maps.googleapis.com/maps/api/geocode/json?address=300%20Ellis%20Street%20San%20Francisco&key=${process.env.GOOGLE_API_KEY}`
        ).json();

        objects.push({
            'objectID': 'GLIDE Daily Free Meals',
            'category': 'Food',
            'eligibilities': ['All'],
            'address': '330 Ellis Street',
            'service': 'Hot breakfast, lunch and dinner on weekdays, bagged lunch on weekends',
            'phone': '415-674-6040',
            'hours': 'Monday-Friday: 8:00am-9:00am, 12:00pm-1:00pm, and 4:00pm-5:00pm; Saturday-Sunday: 12:00pm-1:00pm.',
            '_geoloc': {
                'lat': body2.results[0].geometry.location.lat,
                'lng': body2.results[0].geometry.location.lng
            }
        });

        index.saveObjects(objects, {
            autoGenerateObjectIDIfNotExist: true
        });

    } catch (err) {
        console.error(err);
    }
};
anon();
