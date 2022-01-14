const CronJobs = require('./CronJobs');
const Task = require('../../intefraces/Taskeable');
const ServiceActions = require("../../services/busynessLogic/Service.actions");
const {CalendarDate} = require("../../utils/Date.utils");

describe('UNIT TEST CronJobs', () =>{
    it('attribute jobs should be a list of Task Objects', () => {


        const week = ServiceActions.prepareWeek(new CalendarDate('2022-01-01'), [1, 2, 3]);
        ServiceActions.storeWeek(week);

        const cron = new CronJobs();

        expect(cron.jobs.every(job => job instanceof Task)).toBeTruthy();
    })
})