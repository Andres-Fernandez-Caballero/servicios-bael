const LocalStorage = require('node-localstorage').LocalStorage
const appConfig = require('./../../config');


let db = new LocalStorage(`./src/database/localstorage/production`);

if(appConfig.ENVIRONMENT !== 'production')
    db = new LocalStorage(`./src/database/localstorage/${appConfig.ENVIRONMENT}`);


module.exports = db;