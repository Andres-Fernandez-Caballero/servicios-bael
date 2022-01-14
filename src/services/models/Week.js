const {Service, FRANCO} = require('./Service');
const {DateUtils} = require('./../../utils/Date.utils');
const {isSameDate, isAValidDate} = DateUtils;


class Week {
    constructor(services) {
        if(!services.every(element => element instanceof Service))
            throw TypeError('all elements of the list most be a Service type')

        this.services = services

    }

    getServiceByDate(date){
        if(!isAValidDate(date)) throw Error('date must be a valid date')

        const service = this.services.find(service => isSameDate(service.date, date));
        return service instanceof Service? service : null

    }

    getLastService() {
        return this.services[this.services.length - 1];

    }

    getCodes() {
        return this.services
                .map(service => service.code)
                .filter(service => service !== FRANCO)

    }

    getWeekEndService() {
        return this.services.find(service => service.code === FRANCO);

    }

}

module.exports = {Week};