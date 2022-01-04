const UpdaterCurrentWeek = require("./UpdaterCurrentWeek");
const ServiceActions = require("./Service.actions");
const {CalendarDate} = require("../../utils/Date.utils");


describe('UNIT TEST UpdaterCurrentWeek', () => {
    it('if date is a valid Date type should create a new UpdaterCurrentWeek or throw an error', () => {
        expect(() => {
            new UpdaterCurrentWeek(new CalendarDate())
        }).not.toThrow();

        expect(() => {
            new UpdaterCurrentWeek()
        }).not.toThrow();

        expect(() => {
            new UpdaterCurrentWeek(new CalendarDate('2022-01-01'))
        }).not.toThrow();

        expect(() => {
            new UpdaterCurrentWeek('2022-01-01')
        }).toThrow();

        expect(() => {
            new UpdaterCurrentWeek('hello world')
        }).toThrow();

        expect(() => {
            new UpdaterCurrentWeek(11223344)
        }).toThrow();
    });

    it('isTimeToUpdater should return tru if the current date or false is not', () => {
        const week = ServiceActions.prepareWeek(new CalendarDate('2022-01-01'), [1,2,3]);

        ServiceActions.storeWeek(week);

        const updaterInWeekEnd = new UpdaterCurrentWeek(new CalendarDate('2022-01-01'))
        const updateInDay1 = new UpdaterCurrentWeek(new CalendarDate('2022-01-02'))
        const updateInDay2 = new UpdaterCurrentWeek(new CalendarDate('2022-01-03'))
        const updateInDay3 = new UpdaterCurrentWeek(new CalendarDate('2022-01-04'))

        expect(updaterInWeekEnd.isTImeToUpdate()).not.toBeTruthy();
        expect(updateInDay1.isTImeToUpdate()).not.toBeTruthy();
        expect(updateInDay2.isTImeToUpdate()).not.toBeTruthy();
        expect(updateInDay3.isTImeToUpdate()).toBeTruthy();
    })

    it('udateWeek method should store a new week in the database', () => {
        const updater = new UpdaterCurrentWeek()
        const newDate = new CalendarDate('2022-01-01');

        updater.updateWeek(newDate, [1, 2]);

        console.log(ServiceActions.getWeek())
        expect(ServiceActions.getWeek().getServiceByDate(newDate).date).toEqual(newDate);
    })

    it('execute method should update a week or not depending on date', () => {
        ServiceActions.removeWeek();
        const week = ServiceActions.prepareWeek(new CalendarDate('2022-01-01'), [1, 2, 3])
        ServiceActions.storeWeek(week);

        expect(new UpdaterCurrentWeek(new CalendarDate('2022-01-01')).execute()).not.toBeTruthy();
        expect(new UpdaterCurrentWeek(new CalendarDate('2022-01-02')).execute()).not.toBeTruthy();
        expect(new UpdaterCurrentWeek(new CalendarDate('2022-01-03')).execute()).not.toBeTruthy();
        expect(new UpdaterCurrentWeek(new CalendarDate('2022-01-04')).execute()).toBeTruthy();
    });
})