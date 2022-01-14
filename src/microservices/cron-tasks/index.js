const cron = require('node-cron');
const CronJobs = require("./CronJobs");

const cornTasks = () => {
    cron.schedule('0 0 0 * * *', () => {
        new CronJobs().execute().catch(err => {console.log('one or more cron jobs failed: ' + err.message)});
    });
}

module.exports = cornTasks;