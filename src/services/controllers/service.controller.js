const ServiceActions = require('./../busynessLogic/Service.actions');
const CurrentServiceDto = require("../dto/CurrentService.dto");
const {CalendarDate} = require("../../utils/Date.utils");


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

    setCurrentWeek: (req, res) => {
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
}

module.exports = serviceController;