const cron = require('node-cron');
const checkForServices = require('./actions');

const cornTasks = () => {
    cron.schedule('0 0 0 * * *', checkForServices);
}

module.exports = cornTasks;