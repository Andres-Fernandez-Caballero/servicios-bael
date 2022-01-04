const ServiceActions = require('./../busynessLogic/Service.actions');
const CurrentServiceDto = require("../dto/CurrentService.dto");
const UpdaterCurrentWeek = require("../busynessLogic/UpdaterCurrentWeek");
const {CalendarDate} = require("../../utils/Date.utils");


const  serviceController = {
    index: (req, res) => {

        try{
            const currentWeek = ServiceActions.getWeek();
            if(currentWeek === null){
                res.render('service/set-weekend');
            }

            console.log(new CalendarDate());

            const service = new CurrentServiceDto(currentWeek
                .getServiceByDate(new CalendarDate())
            );

            res.render('index', {service});

        }catch (e){
            ServiceActions.removeWeek()
            res.send('recurso no encontrado')

        }
    },

    setCurrentWeek: (req, res) => {
        res.render('service/set-weekend');
    },

    storeCurrentWeek: (req, res) => {

            const {initDate} = req.body;

        console.log('initDate: ' + initDate);

            try{
                new UpdaterCurrentWeek().updateWeek(new CalendarDate(initDate),[39, 40, 41, 42, 43]);
            }catch (e) {
                console.log('ERRRRORRRRRRRRR')
            }

            const week = ServiceActions.getWeek();
            console.log(week)
            res.redirect('/');
    },
}

module.exports = serviceController;