'use strict';

require('dotenv').config();

const fs = require('fs');
const got = require('got');

async function anon() {
    try {
        let data = await got('https://data.sfgov.org/resource/9rhx-avuq.json?facility_type=Restroom');
        console.log(data.body);
        fs.writeFileSync('data.json', data.body);
    } catch (err) {
        console.error(err);
    }
};
anon();
