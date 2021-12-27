const dateUtils = require('../../utils/date.utils');
const {Service} = require('./Service');
const servicesDao = require('../dao/servicesDao');


const week = {


    prepareWeek: (init_date, servicesList) => {
        const week = [];
        servicesList.forEach((code, index) => {

            week.push(new Service(code, dateUtils.addDays(init_date,index) ));
        });

        servicesDao.storeWeek(week);

    }
}

module.exports = week;