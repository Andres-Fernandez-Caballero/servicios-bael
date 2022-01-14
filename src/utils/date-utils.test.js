const {DateUtils, CalendarDate, alterIsAVlaidDate, daysOfWeek} = require('./Date.utils');
const IDate = require("../intefraces/Dateable");

const {isAValidDate, isSameDate, addDays} = DateUtils;

describe('UNIT TEST DateUtils', () => {

   describe('UNIT TEST CalendarDate Class', () => {
      it('a empty constructor should create a current date', () => {
         console.log(new CalendarDate().toString());
         expect(alterIsAVlaidDate(new CalendarDate().toISODateString()))
      })

      it('should create a CalendarDate with correct params yyyy-MM-dd string format',() => {
         expect(
             () => {new CalendarDate(123)}
         ).toThrow()

         expect(
             () => {new CalendarDate('hello')}
         ).toThrow()

         expect(
             () => {new CalendarDate('yyyy-MM-dd')}
         ).toThrow()

         expect(
             () => {new CalendarDate('1999-32-01')}
         ).toThrow()

         expect(
             () => {new CalendarDate('1999-12-99')}
         ).toThrow()

         expect(
             () => {new CalendarDate('2022-01-01')}
         ).not.toThrow()

         expect(
             () => {new CalendarDate()}
         ).not.toThrow()

         expect(
             () => {new CalendarDate}
         ).not.toThrow()
      })

      it('CalendarDate should be a Dateable Objet', () => {
         expect(new CalendarDate()).toBeInstanceOf(IDate)
         expect(new CalendarDate('2022-01-01')).toBeInstanceOf(IDate);
      })

      it('toISODateString should return a valid date string', () => {

         expect(alterIsAVlaidDate(new CalendarDate('2022-01-01').toISODateString())).toBeTruthy()
      })

      it('getDay should return a number between 0 and 6 depending the day of date', () => {
         const monday = new CalendarDate('2021-12-13');
         const tuesday = new CalendarDate('2021-12-14');
         const wednesday = new CalendarDate('2021-12-15');
         const thursday = new CalendarDate('2021-12-16');
         const friday = new CalendarDate('2021-12-17');
         const saturday = new CalendarDate('2021-12-18');
         const sunday = new CalendarDate('2021-12-19');

         expect(monday.getDay()).toEqual(daysOfWeek.MONDAY)
         expect(tuesday.getDay()).toEqual(daysOfWeek.TUESDAY)
         expect(wednesday.getDay()).toEqual(daysOfWeek.WEDNESDAY)
         expect(thursday.getDay()).toEqual(daysOfWeek.THURSDAY)
         expect(friday.getDay()).toEqual(daysOfWeek.FRIDAY)
         expect(saturday.getDay()).toEqual(daysOfWeek.SATURDAY)
         expect(sunday.getDay()).toEqual(daysOfWeek.SUNDAY)
      })

      it('getDate should return number of day from the date', () => {

         expect(new CalendarDate('2021-09-12').getDate()).toEqual(12)

         expect(new CalendarDate('2021-12-31').getDate()).toEqual(31)

         expect(new CalendarDate('2022-01-01').getDate()).toEqual(1)
      })

      it('getMonth should return number of day from the date', () => {

         expect(new CalendarDate('2021-09-12').getYear()).toEqual(2021)

         expect(new CalendarDate('2011-12-31').getYear()).toEqual(2011)

         expect(new CalendarDate('2022-01-01').getYear()).toEqual(2022)
      })

      it('getYear should return number of day from the date', () => {

         expect(new CalendarDate('2021-09-12').getDate()).toEqual(12)

         expect(new CalendarDate('2021-12-31').getDate()).toEqual(31)

         expect(new CalendarDate('2022-01-01').getDate()).toEqual(1)
      })
   })

   it('if a date is valid return true else false', () => {
      expect(isAValidDate(123456)).not.toBeTruthy();
      expect(isAValidDate('hello')).not.toBeTruthy();
      expect(isAValidDate('2021-12-01')).not.toBeTruthy();
      expect(isAValidDate(new CalendarDate())).toBeTruthy();
      expect(isAValidDate(new CalendarDate('2022-01-01'))).toBeTruthy();
   })

   it('if two dates are equals should return true or false is not', () => {
      const date1 = new CalendarDate('2021-12-01');
      const date2 = new CalendarDate('2021-12-01');
      const date3 = new CalendarDate('2021-12-02');
      const date4 = new CalendarDate('2021-12-01');

      expect(isAValidDate(new CalendarDate(), new CalendarDate()))
      expect(isSameDate(date1, date2)).toBeTruthy();
      expect(isSameDate(date2, date1)).toBeTruthy();

      expect(isSameDate(date3, date4)).not.toBeTruthy();
      expect(isSameDate(date4, date3)).not.toBeTruthy();
   });


   it('isSameDate must recive a IDate object on both dates or throw a exeption', () => {

      expect(()=> {
         isSameDate('2021-12-01', '2021-12-01')
      }).toThrow();

      expect(()=> {
         isSameDate(new CalendarDate('2021-12-01'), '2021-12-01')
      }).toThrow();

      expect(()=> {
         isSameDate('2021-12-01', new CalendarDate('2021-12-01'))
      }).toThrow();

      expect(()=> {
         isSameDate(1, 2)
      }).toThrow();

      expect(()=> {
         isSameDate(new CalendarDate('2021-12-01'), new CalendarDate('2021-12-01'))
      }).not.toThrow();


      expect(()=> {
          isSameDate('hola', 'adios')
       }).toThrow();
   })

   it('addDays should throw a exception if init_date is nota a Date type', () => {
      expect(() => {
         addDays('hello', 1)
      }).toThrow();

      expect(() => {
         addDays(new CalendarDate(), -1)
      }).toThrow();

      expect(() => {
         addDays(1, 'hello')
      }).toThrow();

      expect(() => {
         addDays(new Date(), -1)
      }).toThrow();
   })

   it('addDays should return a date with added number of the days', () => {
      const date = new CalendarDate('2021-12-01');

      expect(addDays(date, 0).toISODateString()).toEqual('2021-12-01')
      expect(addDays(date, 1).toISODateString()).toEqual('2021-12-02')
      expect(addDays(date, 10).toISODateString()).toEqual('2021-12-11')
      expect(addDays(date, 20).toISODateString()).toEqual('2021-12-21')
      expect(addDays(date, 30).toISODateString()).toEqual('2021-12-31')
      expect(addDays(date, 40).toISODateString()).toEqual('2022-01-10')

      expect(addDays(date, 2).toISODateString()).toEqual('2021-12-03')
   });

   it('addDays should throw a exeption if number_of_days is not a number or init_date is not a Date', () => {
      const date = new Date('2021-12-01');

      expect(() => {
         isSameDate(addDays(date,"one"), new Date('2021-12-02'));
      }).toThrow()

      expect(() => {
         isSameDate(addDays("martes 10 de noviembre","one"), new Date('2021-12-02'));
      }).toThrow()

      expect(() => {
         isSameDate(addDays(10,"one"), new Date('2021-12-02'));
      }).toThrow()
   })
});