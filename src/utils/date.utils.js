const dateUtils = {
    daysOfWeek: {
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6,
        SUNDAY: 0
    },

    addDays:(init_date, days) => {
        let date = new Date(init_date);
        date.setDate(date.getDate() + days);
        return date;
    },

    isSameDate: (date1, date2) => {

        date1 = new Date(date1);
        date2 = new Date(date2);

        if(
            date1.getDate() === date2.getDate()
            &&
            date1.getMonth() === date2.getMonth()
            &&
            date1.getFullYear() === date2.getFullYear()
        ) {
            return true;
        }else{
            return false;
        }
    }
}

module.exports = dateUtils;