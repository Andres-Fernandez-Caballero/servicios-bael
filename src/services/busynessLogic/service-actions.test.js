const ServiceActions = require("./Service.actions");
const {Week} = require("../models/Week");
const {DateUtils, daysOfWeek, CalendarDate} = require("../../utils/Date.utils");
const {FRANCO} = require("./../models/Service");
const delay = require("../../utils/delay");
const {Service} = require("../models/Service");
const {isSameDate, addDays} = DateUtils;


beforeEach(async () => {
    await delay(2500);
    console.log('waiting for a while...');
});

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

            console.log(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-02-03'), week))
            console.log(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-01'), week))
            console.log(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-02'), week))
            console.log(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-03'), week))
            console.log(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-04'), week))


            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-01'), week)).not.toBeTruthy()
            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-02'), week)).not.toBeTruthy()
            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-03'), week)).not.toBeTruthy()
            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-04'), week)).not.toBeTruthy()
            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-05'), week)).toBeTruthy()
            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-01-06'), week)).toBeTruthy()
            expect(ServiceActions.isTimeToReBuildTheWeek(new CalendarDate('2021-02-03'), week)).toBeTruthy()
        });
    })

    describe('actions on the database', () => {

        it('store a week.json in the database and then get the same week.json', async () => {
            const week = ServiceActions.prepareWeek(new CalendarDate(), [1, 2, 3]);
            await ServiceActions.storeWeek(week);
            await delay(1500)
            const weekFromDatabase = await ServiceActions.getWeek();


            await weekFromDatabase.services.forEach((service, index) => {
                //console.log(service)
                expect(service.code).toEqual(week.services[index].code);
                expect(service.date.toString()).toEqual(week.services[index].date.toString());
                expect(service.image).toEqual(week.services[index].image);
            })


        }, 10000)

        it('should return a Week object', async() => {
            expect(await ServiceActions.getWeek()).toBeInstanceOf(Week);

        });

        it('should update a week in the database', async() => {
            const expectedServices = [
                new Service(0, new CalendarDate('2022-01-02')),
                new Service(1, new CalendarDate('2022-01-03')),
                new Service(2, new CalendarDate('2022-01-04')),
                new Service(3, new CalendarDate('2022-01-05')),
            ]
            await ServiceActions.updateWeek(new CalendarDate('2022-01-02'), [1, 2, 3])
            const weekFromDatabase = await ServiceActions.getWeek();
            await weekFromDatabase.services.map((service, index) => {
                expect(service.code).toEqual(expectedServices[index].code)
                expect(service.date.toString()).toEqual(expectedServices[index].date.toString())
                expect(service.image).toEqual(expectedServices[index].image)
            })
        })

    })

})