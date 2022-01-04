const ServiceActions = require("./Service.actions");
const {Week} = require("../models/Week");
const {DateUtils, daysOfWeek, CalendarDate} = require("../../utils/Date.utils");
const {Service, FRANCO} = require("./../models/Service");
const {isSameDate, addDays} = DateUtils;

describe('UNIT TEST ServiceActions', () => {
    it('should create a week.json', () => {

        const codes = [1, 2, 3, 4, 5];

        const week =  ServiceActions.prepareWeek(new CalendarDate('2021-12-26'), codes);

        console.log(week);

        expect(week).toBeInstanceOf(Week);

        expect(week.services).toHaveLength(6);

    });

    it('created week.json with correct attributes', () => {
        const codes = [1, 2, 3, 4, 5];

        const week =  ServiceActions.prepareWeek(new CalendarDate('2021-12-29'), codes);

        const {services} = week;
        services.forEach((service, index) => {expect(service.code).toEqual(index)});

        services.forEach((service, index) => {
            const respectiveDate = addDays(services[FRANCO].date, index);
            expect(isSameDate(service.date, respectiveDate)).toBeTruthy()
        });

        console.log(services);

        expect(services[FRANCO].image).toEqual('franco.jpg');
        services.forEach((service, index) => {
            if (service.code !== FRANCO) {
                expect(service.image).toContain(index + "");
                if(service.date.getDay() >= daysOfWeek.MONDAY && service.date.getDay() <= daysOfWeek.FRIDAY) {
                    expect(service.image).toContain('lv');
                }else if (service.date.getDay() === daysOfWeek.SATURDAY) {
                    expect(service.image).toContain('sa');
                }else if (service.date.getDay() === daysOfWeek.SUNDAY) {
                expect(service.image).toContain('do');
                }
            }
        })
    })

    describe('method isTimeToReBuildTheWeek ',() => {
        it('if date parameter is the same than the date attribute in the last service of the week.json should return true', function () {

            const date = new CalendarDate('2021-01-01')
            const week =ServiceActions.prepareWeek(date, [1, 2, 3]);

            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-02-03'), week)).not.toBeTruthy()

            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-01'), week)).not.toBeTruthy()
            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-02'), week)).not.toBeTruthy()
            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-03'), week)).not.toBeTruthy()
            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-04'), week)).toBeTruthy()
        });
    })

    describe('actions on the database', () => {
        it('store a week.json in the database and then get the same week.json', () => {

            const week = ServiceActions.prepareWeek(new CalendarDate(), [1, 2, 3]);
            ServiceActions.storeWeek(week);

            const weekFromDatabase = ServiceActions.getWeek();

            expect(weekFromDatabase).toEqual(week);
        })

        it('should return a Week object', () => {
            expect(ServiceActions.getWeek()).toBeInstanceOf(Week);
        });
    })
})