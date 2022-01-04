const cron = require('node-cron');
const CronJobs = require("./CronJobs");

const cornTasks = () => {
    cron.schedule('0 0 0 * * *', () => {
        new CronJobs().execute();
    });
}

module.exports = cornTasks;