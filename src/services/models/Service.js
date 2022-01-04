const imageUtils = require("../../utils/Image.utils");
const {DateUtils} = require('../../utils/Date.utils');
const {isAValidDate} = DateUtils;
const FRANCO = 0;

const servicesList = [
    0,
    39,
    40,
    41,
    42,
    43,
];

class Service {
    constructor(code, date) {

        if(code < 0 || isNaN(code)){
            throw TypeError('code should be a number equal or higher than ZERO');
        }

        if(!isAValidDate){
            throw TypeError('date must be a valid date');
        }

        this.code = parseInt(code, 10);
        this.date = date;
        this.image = imageUtils.getImageByDayOfWeek(code, date);
    }
}


module.exports = {
    servicesList,
    Service,
    FRANCO
}
