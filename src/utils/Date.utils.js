const moment = require('moment');
const IDate = require("../intefraces/IDate");

const daysOfWeek = {
    MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6,
        SUNDAY: 0,
}


const functionIsAVlaidDate = (date) => {
    return date instanceof IDate;
}

const isValidStringDate = (date_string) => {
    const regEx = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regEx.test(date_string);
}

class CalendarDate extends IDate{

    #date

    constructor(date_string = null) {
        super();

        if(date_string === null){
            this.#date = moment();
        }else{
            if(!isValidStringDate(date_string)){
                throw TypeError('date_string not have correct format');
            }else {
                this.#date = moment(date_string);
            }
        }
    }

    getDay() {
        return this.#date.day();
    }

    getDate() {
        return this.#date.date();
    }

    getYear() {
        return this.#date.year();
    }

    getMonth() {
        return this.#date.month();
    }

    addDays(number_of_days) {
        let newMoment = moment(this.#date.toISOString().split('T')[0]);

        newMoment.add(number_of_days, 'days');
        return new CalendarDate(newMoment.toISOString().split('T')[0])
    }

    toISODateString() {
        return this.#date.toISOString().split('T')[0];
    }
}

const DateUtils = {

    addDays:(init_date, number_of_days) => {
        if(isNaN(number_of_days)) throw new TypeError('number_of_days most be a number')

        if(number_of_days < 0) throw new Error('number_of_days to be equal or higher than ZERO')

        if(!functionIsAVlaidDate(init_date)) throw new TypeError('init_date most be a IDate');


        return init_date.addDays(number_of_days);
    },

    isSameDate: (date1, date2) => {
        if(!functionIsAVlaidDate(date1) || !functionIsAVlaidDate(date2))
            throw new TypeError('date most be a IDate object')

        return (
            date1.getDate() === date2.getDate()
            &&
            date1.getMonth() === date2.getMonth()
            &&
            date1.getYear() === date2.getYear()
        );
    },

    isAValidDate: functionIsAVlaidDate
}

module.exports = {DateUtils, CalendarDate, alterIsAVlaidDate: isValidStringDate, daysOfWeek};