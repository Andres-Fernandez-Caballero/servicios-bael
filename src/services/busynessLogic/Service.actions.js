const {Service} = require('./../models/Service');
const {Week} = require("../models/Week");
const {DateUtils} = require("../../utils/Date.utils");
const ServicesDao = require("../dao/ServicesDao");

const {addDays, isSameDate} = DateUtils;

const ServiceActions = {
    prepareWeek: (date_of_weekend_before_codes, codes) => {

        let services = [];

        services.push(new Service(0, date_of_weekend_before_codes));
        for (let index = 0; index < codes.length; index++) {
            services.push(new Service(codes[index], addDays(date_of_weekend_before_codes, index + 1)));
        }

        return new Week(services);
    },

    storeWeek: (week) =>{
        ServicesDao.storeWeek(week);
    },

    getWeek: () => {
        return ServicesDao.getWeek();
    },

    removeWeek: () => {
        ServicesDao.cleanWeek();
    },

    storeActualService: (service) => {
        ServicesDao.storeActualService(service);
    },

    getActualService: () => {
        return ServicesDao.getActualService();
    },

    removeService: () => {
        ServicesDao.cleanService();
    },

    isTimeToReBuildTheWeek(date, week) {
        const serviceByDate = week.getServiceByDate(date);
        const lastService = week.getLastService()

        if(serviceByDate === null){
            return false;
        }
        return (serviceByDate.code === lastService.code && isSameDate(serviceByDate.date, lastService.date) );
    }
}

module.exports = ServiceActions;