const CronJobs = require('./CronJobs');
  new CronJobs().execute().catch(err => {console.log('Cant execute one or more cron jobs')})
