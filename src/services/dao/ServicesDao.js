const db = require('./../../database/localstorage/localStorageDb')
const {Service} = require("../models/Service");
const {Week} = require("../models/Week");
const {CalendarDate} = require("../../utils/Date.utils");

const currentService = 'actualService';
const currentWeek = 'week';


const ServicesDao = {

    /*** Week methods ***/

    storeWeek: (week) => {
        const weekToStore =
            {
                services: week.services
                    .map(service => ({...service, date:service.date.toISODateString()}))
            }

        db.setItem(currentWeek,JSON.stringify(weekToStore))
    },

    getWeek: () => {
        const store = db.getItem(currentWeek);
        if (store === null){
            return null;
        }

        const servicesFromDatabase = JSON.parse(store).services;

        const services = servicesFromDatabase.map(element => new Service(element.code, new CalendarDate(element.date)))

        return new Week(services);
    },

    cleanWeek: () => {
        db.removeItem(currentWeek);
    }
}


module.exports = ServicesDao;