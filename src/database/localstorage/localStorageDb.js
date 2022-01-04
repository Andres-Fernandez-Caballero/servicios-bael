const LocalStorage = require('node-localstorage').LocalStorage
const appConfig = require('./../../config');


let db = new LocalStorage('./src/database/localstorage');

if(appConfig.ENVIRONMENT === 'test'){
    db =  new LocalStorage('./src/database/localstorage/test');
}else if (appConfig.ENVIRONMENT === 'development') {
    db =  new LocalStorage('./src/database/localstorage/development');
}else if (appConfig.ENVIRONMENT === 'production') {
    db =  new LocalStorage('./src/database/localstorage/production');
}

module.exports = db;