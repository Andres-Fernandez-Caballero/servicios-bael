const ServiceActions  = require("./Service.actions");
const {DateUtils, CalendarDate} = require("../../utils/Date.utils");
const ITask = require("../../intefraces/Taskeable");


class UpdaterCurrentWeek extends ITask {

    constructor(date = new CalendarDate()) {
        super();
        if(!DateUtils.isAValidDate(date)) throw TypeError('date must be a valid CalendarDate object')

        this.date = date;

    }

      async execute() {
        return new Promise(async (resolve, reject) => {
            console.log('chequeando semana...');

            const weekFromDatabase = await ServiceActions.getWeek()

            if(await ServiceActions.isTimeToReBuildTheWeek(this.date, weekFromDatabase)){
                console.log('Reiniciando la semana');

                await ServiceActions.updateWeek(
                    DateUtils.addDays(this.date, 1),
                    weekFromDatabase.getCodes()
                )

                console.log('semana reiniciada!!! 🎉')
                resolve(true);
            }else {
                console.log('no es necesario reiniciar la semana')
                resolve(false);
            }
            // console.log('no se pudo chequear la semana')
        })
    }
}

module.exports = UpdaterCurrentWeek;