const {Service, FRANCO} = require("./Service");
const {Week} = require("./Week");
const {DateUtils, CalendarDate} = require("../../utils/Date.utils");
const {isSameDate} = DateUtils
const ServiceActions = require("../busynessLogic/Service.actions");


describe('UNIT TEST Week', () => {
    it('all of elements of the list services should be a Service type or throw a exeption', () => {

        expect(() => {
            new Week(undefined)
        }).toThrow()

        expect(() => {
            new Week(null)
        }).toThrow()

        expect(() => {
            new Week([undefined, 3, new Service(39, new Date()), null])
        }).toThrow()

        expect(() => {
            new Week([undefined, 3, new Service(39, new Date())])
        }).toThrow()

        expect(() => {
            new Week([null, 3, new Service(39, new Date())])
        }).toThrow()

        expect(() => {
            new Week(['fruit', 3, new Service(39, new Date())])
        }).toThrow()

        expect(() => {
            new Week([new Service(30, new CalendarDate()), new Service(39, new CalendarDate())])
        }).not.toThrow()
    })

    describe('method getServiceByDate', () => {
        it('should get a IDate type and return a Service object',() => {
            const week = new Week([
                new Service(1, new CalendarDate()),
                new Service(2, new CalendarDate('2021-12-31')),
                new Service(3, new CalendarDate('2022-01-01')),
            ])

            const serviceResult = week.getServiceByDate(new CalendarDate('2022-01-01'));
            expect(serviceResult).toBeInstanceOf(Service);
            expect(isSameDate(serviceResult.date, new CalendarDate('2022-01-01'))).toBeTruthy();



            const week2 = ServiceActions.prepareWeek(
                new CalendarDate('2022-01-01'), [39, 40, 41, 42, 43]);
            const date = new CalendarDate('2022-01-02');

            expect(week2.getServiceByDate(date).code).toEqual(39);
        })

        it('should recive a Date type or throw exception', () => {

            const week = new Week([
                new Service(1, new CalendarDate()),
                new Service(2, new CalendarDate('2021-12-31')),
                new Service(3, new CalendarDate('2022-01-01')),
            ])

            expect(() => {
                week.getServiceByDate('hola')
            }).toThrow()

            expect(() => {
                week.getServiceByDate('2021-05-15')
            }).toThrow()

            expect(() => {
                week.getServiceByDate(21211206)
            }).toThrow()

            expect(() => {
                week.getServiceByDate(undefined)
            }).toThrow()

            expect(() => {
                week.getServiceByDate(null)
            }).toThrow()

            expect(() => {
                week.getServiceByDate(new CalendarDate('2021-12-31'))
            }).not.toThrow()

        })

        it('getServiceByDate should return a Service if not found one, returns null', () => {
            const week = new Week([
                new Service(1, new CalendarDate()),
                new Service(2, new CalendarDate('2021-12-31')),
                new Service(3, new CalendarDate('2022-01-01')),
            ])

            expect(week.getServiceByDate(new CalendarDate('2021-12-31'))).toBeInstanceOf(Service);
            expect(week.getServiceByDate(new CalendarDate('2021-12-31')).code).toEqual(2);
            expect(week.getServiceByDate(new CalendarDate('2021-06-25'))).toBeNull();
        })
    })

    describe('method getActualService', () => {
        it('should return a Service type and that must have a code equal to respective code number', () => {
            const week = new Week([
                new Service(1, new CalendarDate()),
                new Service(2, new CalendarDate('2021-12-31')),
                new Service(3, new CalendarDate('2022-01-01')),
            ])

            expect(week.getLastService()).toBeInstanceOf(Service);
            expect(week.getLastService().code).toEqual(3);

            const week2 = new Week([
                new Service(1, new CalendarDate()),
                new Service(2, new CalendarDate('2021-12-31')),
                new Service(3, new CalendarDate('2022-01-01')),
                new Service(4, new CalendarDate('2022-01-02')),
                new Service(5, new CalendarDate('2022-01-03')),
            ])

            expect(week2.getLastService()).toBeInstanceOf(Service);
            expect(week2.getLastService().code).toEqual(5);
        })

        it('getCodes should return a list of numbers', () => {
            const week = new Week([
                new Service(1, new CalendarDate()),
                new Service(2, new CalendarDate('2021-12-31')),
                new Service(3, new CalendarDate('2022-01-01')),
            ]);

            expect(week.getCodes()).toEqual([1, 2, 3]);

            const week2 = new Week([
                new Service(FRANCO, new CalendarDate()),
                new Service(1, new CalendarDate('2021-12-31')),
                new Service(2, new CalendarDate('2022-01-01')),
                new Service(3, new CalendarDate('2022-01-02')),
            ]);

            expect(week2.getCodes()).toEqual([1, 2, 3]);
        });

        it('should return the service with the code 0 -> FRANCO', () => {

            const serviceFranco = new Service(FRANCO, new CalendarDate('2021-12-30'))

            const week = new Week([
                serviceFranco,
                new Service(1, new CalendarDate('2021-12-31')),
                new Service(2, new CalendarDate('2022-01-01')),
                new Service(3, new CalendarDate('2022-01-02')),
            ]);

            expect(week.getWeekEndService()).toEqual(serviceFranco)
        });
    })
})