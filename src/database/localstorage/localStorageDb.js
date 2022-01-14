const LocalStorage = require('node-localstorage').LocalStorage
const appConfig = require('./../../config');


const db = new LocalStorage(`./src/database/localstorage/${appConfig.serverConfigs.ENVIRONMENT}`);


module.exports = db;