const LocalStorage = require('node-localstorage').LocalStorage

const db = new LocalStorage('./src/database/localstorage');

const servicesDao = {

    storeWeek: (week) => {
        db.setItem('week',JSON.stringify(week))
    },

    getWeek: () => {
        const store = db.getItem('week');
        if (store === null){
            //TODO: throw exeption
        }
        return JSON.parse(store);
    },

    storeActualService: (service) => {
        db.setItem('actualService', JSON.stringify(service))
    },

    getActualService: () => {
        const store = db.getItem('actualService',);
        if (store === null){
            //TODO: throw exeption
        }
        return JSON.parse(store);
    }
}

module.exports = servicesDao;