const UpdaterCurrentWeek = require('./../../services/busynessLogic/UpdaterCurrentWeek');
const Task = require('./../../intefraces/Task')

class CronJobs extends Task {

    constructor() {
        super();
        this.jobs = [
            new UpdaterCurrentWeek(),
        ]
    }

    execute() {
        this.jobs.forEach(job => {
            try{
                job.execute()
            }catch (e) {
                console.log(e);
            }
        })
    }
}

module.exports = CronJobs;