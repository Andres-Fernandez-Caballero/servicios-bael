const ServiceActions = require('./../busynessLogic/Service.actions');
const CurrentServiceDto = require("../dto/CurrentService.dto");
const {CalendarDate} = require("../../utils/Date.utils");
const GalleryServicesDto = require("../dto/GalleryServices.dto");


const  serviceController = {
    index: async (req, res) => {
       try {
           const currentWeek = await ServiceActions.getWeek();

           if(currentWeek !== null){
                const actualService = currentWeek.getServiceByDate(new CalendarDate());
                if(actualService === null){
                    res.redirect('/week')
                }else{
                    res.render('index', {service: new CurrentServiceDto(actualService)})
                }
           }else{
               res.redirect('/week')
           }

       }catch (e) {
            res.send(e)
       }
    },

    setCurrentWeek: async (req, res) => {
        res.render('service/set-weekend');
    },

    storeCurrentWeek: async (req, res) => {

            const {initDate} = req.body;

        console.log('initDate: ' + initDate);

            try{
               await ServiceActions.updateWeek(new CalendarDate(initDate),[39, 40, 41, 42, 43]);
            }catch (e) {
                console.log('ERRRRORRRRRRRRR')
            }

            const week = await ServiceActions.getWeek();
            console.log(week)
            res.redirect('/');
    },
    gallery: async (req, res) => {
        const {services} = await ServiceActions.getWeek();
        res.render('service/gallery', {services: new GalleryServicesDto(services).services} )

    }
}

module.exports = serviceController;