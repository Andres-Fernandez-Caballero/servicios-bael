const UpdaterCurrentWeek = require('./../../services/busynessLogic/UpdaterCurrentWeek');
const Task = require('../../intefraces/Taskeable')

class CronJobs extends Task {

    constructor() {
        super();
        this.jobs = [
            new UpdaterCurrentWeek(),
        ]
    }

    async execute() {
        for (const job of this.jobs) {
            try{
                await job.execute()
            }catch (e) {
                console.log(e);
            }
        }
    }
}

module.exports = CronJobs;