const {Service, FRANCO} = require("./Service");
const {CalendarDate} = require("../../utils/Date.utils");


describe('UNIT TEST Service', () => {

    it('FRANCO should be integer and ZERO', () => {
        expect(Number.isInteger(FRANCO)).toBeTruthy()
        expect(FRANCO).toEqual(0);
    })

    it('should create a Service objet', () => {
        const service = new Service(10, new CalendarDate());

        expect(service instanceof Service).toBeTruthy();
    })

    it('code should be a number equal or higher than ZERO or throw a exeption', () => {
        expect(() => {
            new Service(FRANCO, new CalendarDate());
        }).not.toThrow();

        expect(() => {
            new Service("0", new CalendarDate());
        }).not.toThrow();


        expect(() => {
            new Service(-1, new CalendarDate());
        }).toThrow();

        expect(() => {
            new Service("hello", new CalendarDate());
        }).toThrow();

        expect(() => {
            new Service(39, new CalendarDate());
        }).not.toThrow();

        expect(() => {
            new Service('39', new CalendarDate());
        }).not.toThrow();
    })

    it('date should be a Date type or throw a exeption', () => {
        expect(() => {
            new Service(39, 'hello')
        }).toThrow();

        expect(() => {
            new Service(39, '2021-12-01');
        }).toThrow();

        expect(() => {
            new Service(39, 20211201)
        }).toThrow();

        expect(() => {
            new Service(39, new CalendarDate())
        }).not.toThrow();

        expect(() => {
            new Service(39, new CalendarDate('2021-12-20'))
        }).not.toThrow();
    })

    it('Service with FRANCO code should be ZERO',() => {
        expect(new Service(FRANCO, new CalendarDate()).code).toEqual(0);
        expect(new Service(FRANCO, new CalendarDate()).code).toEqual(FRANCO);
    });
})