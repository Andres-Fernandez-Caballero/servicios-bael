const db = require('./../../database/localstorage/localStorageDb');
const ServicesDao = require("./ServiceDao");
const {Service} = require("../models/Service");
const {CalendarDate} = require("../../utils/Date.utils");
const {Week} = require("../models/Week");


class ServiceDaoLocalStorage extends ServicesDao {

    async storeWeek(week) {
        const weekToStore =
            {
                services: week.services
                    .map(service => (
                        {...service, date:service.date.toISODateString()}
                    ))
            }

        await db.setItem('week',JSON.stringify(weekToStore))

    }

    async cleanWeek() {
        if(await db.getItem('week') !== null) await db.removeItem('week');

    }

    async getWeek() {
        const store = await db.getItem('week');
        if (store === null) return null;

        const servicesFromDatabase = JSON.parse(store).services;

        const services = servicesFromDatabase
            .map(element => new Service(element.code, new CalendarDate(element.date)))

        return new Week(services);

    }

}

module.exports = ServiceDaoLocalStorage;