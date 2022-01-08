const LocalStorage = require('node-localstorage').LocalStorage
const appConfig = require('./../../config');


if(appConfig.ENVIRONMENT === 'production') {
    db = new LocalStorage(`./src/database/localstorage/production`);
}else{
    db = new LocalStorage(`./src/database/localstorage/${appConfig.ENVIRONMENT}`);
}


module.exports = db;