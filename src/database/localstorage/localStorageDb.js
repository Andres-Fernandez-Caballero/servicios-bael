const LocalStorage = require('node-localstorage').LocalStorage
const appConfig = require('./../../config');


db = new LocalStorage(`./src/database/localstorage/${appConfig.ENVIRONMENT}`);


module.exports = db;