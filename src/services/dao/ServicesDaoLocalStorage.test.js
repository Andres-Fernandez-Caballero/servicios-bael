const ServiceActions = require("../busynessLogic/Service.actions");
const {CalendarDate, DateUtils} = require("../../utils/Date.utils");
const ServiceDao = require('./ServiceDao');
const ServiceDaoLocalStorage = require("./ServiceDaoLocalStorage");
const {isSameDate} = DateUtils;

describe('UNIT TEST serviceDao', () => {

    it('should be a ServiceDao object', function () {
        expect(new ServiceDaoLocalStorage()).toBeInstanceOf(ServiceDao);
    });

    describe('week', () => {
        it('clean element week.json from the database', async() => {
            const serviceDao = new ServiceDaoLocalStorage();
            await serviceDao.cleanWeek();
            expect(await serviceDao.getWeek()).toBeNull();
        })

        it('store a week.json in a database and then get the same week.json and all owns children Services',
            async () => {
            const week = ServiceActions.prepareWeek(new CalendarDate('2021-12-31'), [1, 2, 3]);

            const serviceDao = new ServiceDaoLocalStorage();
            await serviceDao.storeWeek(week);

            const weekFromDatabase = await serviceDao.getWeek();

            expect(weekFromDatabase.services.length).toEqual(week.services.length);

            weekFromDatabase.services.forEach((service, index) => {
                expect(service.code).toEqual(week.services[index].code);
                expect(service.date).toBeInstanceOf(CalendarDate);
                expect(isSameDate(service.date, week.services[index].date)).toBeTruthy();
            })
                expect(weekFromDatabase).toEqual(week)
        })
    })
})