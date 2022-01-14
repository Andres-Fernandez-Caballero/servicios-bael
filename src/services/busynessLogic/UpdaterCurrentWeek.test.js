const UpdaterCurrentWeek = require("./UpdaterCurrentWeek");
const ServiceActions = require("./Service.actions");
const {CalendarDate} = require("../../utils/Date.utils");
const delay = require("../../utils/delay");


beforeEach(async () => {
    await delay(2500);
    console.log('waiting for a while')

});

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

    it('execute method should update a week or not, depending on the initDate',  async () => {
        await ServiceActions.updateWeek(new CalendarDate('2022-01-13'), [1, 2, 3, 4, 5 ])
        await delay(2000);

        if(await new UpdaterCurrentWeek(new CalendarDate('2022-01-18')).execute()){
            console.log('si')
        }else {
            console.log('no')
        }

        // await expect(new UpdaterCurrentWeek(new CalendarDate('2022-01-13')).execute())
        //     .resolves.not.toBeTruthy()

    }, 30000);
})