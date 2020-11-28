import dotenv from 'dotenv';
dotenv.config()

import algoliaSearch from "algoliasearch";

const client = algoliaSearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);

export default client;