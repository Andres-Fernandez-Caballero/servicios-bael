const {Service, FRANCO} = require("../models/Service");
const {CalendarDate} = require("../../utils/Date.utils");

const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

class CurrentServiceDto {

    constructor(service = new Service(FRANCO, new CalendarDate())) {
        this.code = service.code === 0? 'Franco': service.code;
        this.image = service.image;
        this.date = service.date.toString();
        this.day = days[service.date.getDay()];

    }
}

module.exports = CurrentServiceDto;