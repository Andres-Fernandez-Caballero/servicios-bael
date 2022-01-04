const {Service, FRANCO} = require("../models/Service");

const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo',];

class CurrentServiceDto {

    constructor(service = new Service(FRANCO, new Date())) {

        this.code = service.code;
        this.image = service.image;
        this.date = service.date;
        this.day = days[service.date.getDay()];
    }
}

module.exports = CurrentServiceDto;