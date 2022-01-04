const ServiceActions  = require("./Service.actions");
const {DateUtils, CalendarDate} = require("../../utils/Date.utils");
const Task = require("../../intefraces/Task");


class UpdaterCurrentWeek extends Task {

    constructor(date = new CalendarDate()) {
        super();
        if(!DateUtils.isAValidDate(date)){
            throw TypeError('date must be a valid date')
        }
        this.date = date;
    }

    isTImeToUpdate() {
        const week = ServiceActions.getWeek();

        if(week === null){
            throw new Error('element week.json not found in the database');
        }

        return ServiceActions.isTimeToReBuildTheWeek(this.date, week);
    }

    updateWeek(new_initial_date, codes){
        const week = ServiceActions.prepareWeek(new_initial_date, codes);
        ServiceActions.storeWeek(week);
    }

    execute() {
        console.log('chequeando semana...');
        if(this.isTImeToUpdate()){
            const week = ServiceActions.getWeek();
            const newInitDate = DateUtils.addDays(this.date, 1);

            this.updateWeek(newInitDate, week.getCodes())
            console.log('semana reiniciada!!! 🎉')
            return true;
        }else{
            console.log('no es necesario reiniciar la semana')
            return false
        }
    }
}

module.exports = UpdaterCurrentWeek;