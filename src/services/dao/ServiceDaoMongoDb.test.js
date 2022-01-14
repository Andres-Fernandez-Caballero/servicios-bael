const ServiceDaoMongoDb = require('./ServiceDaoMongoDb');
const ServiceDao = require('./ServiceDao');
const {Week} = require("../models/Week");
const {Service} = require("../models/Service");
const {CalendarDate} = require("../../utils/Date.utils");
const delay = require("../../utils/delay");


beforeEach(async () => {
    await delay(2500)
    console.log('waiting for a while')
});

describe('UNIT TEST ServiceDaoMongoDb', () => {
    it('should be a ServiceDao Object', () => {
        expect(new ServiceDaoMongoDb).toBeInstanceOf(ServiceDao)
    })

    it('storeWeek most get a Week object or throw exception', async () => {
        const dao = new ServiceDaoMongoDb();

        await expect(
             dao.storeWeek('week')
        ).rejects.toThrow()

        await expect(
            dao.storeWeek(123)
        ).rejects.toThrow()

        await expect(
            dao.storeWeek(undefined)
        ).rejects.toThrow()

        await expect(
             dao.storeWeek(null)
        ).rejects.toThrow()

        await expect(
            dao.storeWeek(new Week([
                new Service(1, new CalendarDate('2022-01-01')),
                new Service(2, new CalendarDate('2022-01-02')),
                new Service(3, new CalendarDate('2022-01-03')),
            ]))
        ).resolves.not.toThrow()

    })

    it('should store a get a week from the database and get the same object', async () => {
        const week = new Week(
            [
                new Service(1, new CalendarDate('2022-01-03')),
                new Service(2, new CalendarDate('2022-01-04')),
                new Service(3, new CalendarDate('2022-01-05')),
            ])

        const dao = new ServiceDaoMongoDb();
        await dao.storeWeek(week);
        await delay(2500);
        const weekFromDatabase = await dao.getWeek()
        await delay(1500);
        await weekFromDatabase.services.forEach((service, index) => {
            console.log(service)
            expect(service.code).toEqual(week.services[index].code);
            expect(service.date.toString()).toEqual(week.services[index].date.toString());
            expect(service.image).toEqual(week.services[index].image);
        })

    },10000)

    it('clearWeek should return a message with "clear week"', async () => {
        // const dao = new ServiceDaoMongoDb();
        // const response = await dao.cleanWeek();
        //
        // expect(response.message).toEqual('clear week');
    })

})