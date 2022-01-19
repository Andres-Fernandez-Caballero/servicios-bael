

const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

class GalleryServicesDto {

    constructor(services) {
        this.services = services.map(service =>  ({...service, date: service.date.toString(), day: days[service.date.getDay()]}))
    }
}

module.exports = GalleryServicesDto;