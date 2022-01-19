const {Service} = require('./../models/Service');
const {Week} = require("../models/Week");
const {DateUtils} = require("../../utils/Date.utils");
const ServicesDaoBuildier = require("../dao/DaoBuldier");
const {addDays} = DateUtils;
const serviceDao = ServicesDaoBuildier.getDaoService();


const ServiceActions = {
    prepareWeek: (date_of_weekend_before_codes, codes) => {
        let services = [];

        services.push(new Service(0, date_of_weekend_before_codes));
        for (let index = 0; index < codes.length; index++) {
            services.push(new Service(codes[index], addDays(date_of_weekend_before_codes, index + 1)));
        }
        return new Week(services);

    },

    storeWeek: async(week) =>{
        await serviceDao.storeWeek(week);

    },

    getWeek: async() => {
        try{
            return await serviceDao.getWeek();
        }catch (e) {
            console.log(e);
            return null;
        }

    },

    removeWeek: async () => {
        //await serviceDao.cleanWeek();
    },

    getActualService: async() => {
        //TODO: should return the actual service from the current week or cookie data
    },

    isTimeToReBuildTheWeek: (date, week) => {
        const dateFromLastService = week.getLastService().date;
        return date > dateFromLastService;

    },

    updateWeek: async (new_initial_date, codes) => {
        const week = ServiceActions.prepareWeek(new_initial_date, codes);
        await ServiceActions.storeWeek(week);

    }

}

module.exports = ServiceActions;