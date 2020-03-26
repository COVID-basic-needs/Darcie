/* eslint-disable prettier/prettier */
/* global algoliasearch instantsearch */

import injectScript from 'scriptjs';

require('dotenv').config();

injectScript(
  `https://maps.googleapis.com/maps/api/js?v=quarterly&key=${process.env.GOOGLE_API_KEY}`,
  () => {
    const searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_KEY
    );

    const search = instantsearch({
      indexName: process.env.ALGOLIA_DARCIE_INDEX,
      searchClient
    });

    search.addWidgets([
      instantsearch.widgets.searchBox({
        container: '#searchbox'
      }),
      instantsearch.widgets.geoSearch({
        container: '#maps',
        googleReference: window.google
      }),
      instantsearch.widgets.hits({
        container: '#hits',
        templates: {
          item: `
    <article>
      <h1>{{#helpers.highlight}}{ "attribute": "objectID" }{{/helpers.highlight}}</h1>
      <p>{{#helpers.highlight}}{ "attribute": "service" }{{/helpers.highlight}}</p>
      <p>{{#helpers.highlight}}{ "attribute": "address" }{{/helpers.highlight}}</p>
      <p>{{#helpers.highlight}}{ "attribute": "hours" }{{/helpers.highlight}}</p>
    </article>
    `
        }
      }),
      // instantsearch.widgets.refinementList({
      //   container: '#brand-list',
      //   attribute: 'brand'
      // }),
      instantsearch.widgets.pagination({
        container: '#pagination'
      })
    ]);

    search.start();
  }
);
