const serviceDao = require('./ServicesDao');
const ServiceActions = require("../busynessLogic/Service.actions");
const {CalendarDate, DateUtils} = require("../../utils/Date.utils");
const {isSameDate} = DateUtils;

describe('UNIT TEST serviceDao', () => {

    describe('week.json', () => {
        it('clean element week.json from the database', () => {
            serviceDao.cleanWeek();
            expect(serviceDao.getWeek()).toBeNull();
        })

        it('store a week.json in a database and then get the same week.json and all owns children Services',
            () => {
            const week = ServiceActions.prepareWeek(new CalendarDate('2021-12-31'), [1, 2, 3]);

            serviceDao.storeWeek(week);

            const weekFromDatabase = serviceDao.getWeek();

            expect(weekFromDatabase.services.length).toEqual(week.services.length);

            weekFromDatabase.services.forEach((service, index) => {
                expect(service.code).toEqual(week.services[index].code);
                expect(service.date).toBeInstanceOf(CalendarDate);
                expect(isSameDate(service.date, week.services[index].date)).toBeTruthy();
            })
        })
    })
})