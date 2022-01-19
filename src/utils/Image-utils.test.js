const {getImageByDayOfWeek} = require('./Image.utils');
const {FRANCO} = require("../services/models/Service");
const {CalendarDate} = require("./Date.utils");


describe('UNIT TEST imageUtils',() => {
    it('getImageByDayOfWeek code parameter should be a number or throw a exception', () => {

        expect(() => {
            getImageByDayOfWeek(undefined, new CalendarDate())
        }).toThrow();

       expect(() => {
           getImageByDayOfWeek('franco', new CalendarDate())
       }).toThrow();

        expect(() => {
            getImageByDayOfWeek(-1, new CalendarDate())
        }).toThrow()

        expect(() => {
            getImageByDayOfWeek(0, new CalendarDate())
        }).not.toThrow()

        expect(() => {
            getImageByDayOfWeek(1, new CalendarDate())
        }).not.toThrow()
    });


    it('should return a string with code name and respective day of and file type',  () => {
        const friday = new CalendarDate('2021-12-17');
        const saturday = new CalendarDate('2021-12-18');
        const sunday = new CalendarDate('2021-12-19');
        const today = new CalendarDate();


        expect(getImageByDayOfWeek(FRANCO, friday)).toBe('franco-min.jpg');
        expect(getImageByDayOfWeek(FRANCO, saturday)).toBe('franco-min.jpg');
        expect(getImageByDayOfWeek(FRANCO, sunday)).toBe('franco-min.jpg');
        expect(getImageByDayOfWeek(FRANCO, today)).toBe('franco-min.jpg');

        const code = 39;
        expect(getImageByDayOfWeek(code,friday)).toBe('serv-39-lv-min.jpg');
        expect(getImageByDayOfWeek(code, saturday)).toBe('serv-39-sa-min.jpg');
        expect(getImageByDayOfWeek(code, sunday)).toBe('serv-39-do-min.jpg');
    });
})