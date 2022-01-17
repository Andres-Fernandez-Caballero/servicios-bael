const {DateUtils, daysOfWeek} = require('./Date.utils');
const{isAValidDate} = DateUtils;

const ImageUtils = {
    getImageByDayOfWeek: (code, date) => {

        if(isNaN(code) || code < 0){
            throw TypeError('code most be a number and it could be equal or higher than ZERO');
        }

        if(!isAValidDate(date)){
            throw TypeError("date must be a IDate object")
        }

        if(code === 0){
            return 'franco-min.jpg'
        }

        let image = `serv-${code}-`;

        const dayOfWeek = date.getDay();


        if(dayOfWeek>=daysOfWeek.MONDAY && dayOfWeek <= daysOfWeek.FRIDAY ){
            return image.concat('lv').concat('-min.jpg');

        }else if(dayOfWeek === daysOfWeek.SATURDAY) {
            return image.concat('sa').concat('-min.jpg');

        }else if (dayOfWeek === daysOfWeek.SUNDAY) {
            return image.concat('do').concat('-min.jpg');
        }
    }
}

module.exports = ImageUtils;