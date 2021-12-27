const servicesDao = require("../../services/dao/servicesDao");
const {isSameDate} = require("./../../utils/date.utils");
const week = require("../../services/models/Week");
const Services = require("../../services/models/Service");


const checkForServices = () => {
    console.log('actualizando servicios...');

    const weekServices = servicesDao.getWeek();

    const actualService = weekServices.filter(service => isSameDate(service.date, new Date()))[0];
    console.log(actualService)

    if(actualService.code === 'proximo-franco'){
        console.log('Semana Reiniciada!')
        week.prepareWeek(actualService.date, Services.servicesList);
    }

    servicesDao.storeActualService(actualService);

    console.log('servicios actualizados 🎉‍')
}

module.exports = checkForServices();
