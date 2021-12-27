const {daysOfWeek} = require('./date.utils');

const imageUrl = 'servicios/'

const imageUtils = {
    getImageByDayOfWeek: (code, date) => {

        if(code === 'franco' || code === 'proximo-franco'){
            return 'franco.jpg'
        }

        let image = `serv-${code}-`;

        const dayOfWeek = date.getDay();

        if(dayOfWeek>=daysOfWeek.MONDAY & dayOfWeek <= daysOfWeek.FRIDAY ){
            return image.concat('lv').concat('.jpg');

        }else if(dayOfWeek === daysOfWeek.SATURDAY) {
            return image.concat('sa').concat('.jpg');

        }else if (dayOfWeek === daysOfWeek.SUNDAY) {
            return image.concat('do').concat('.jpg');

        }else{
            //TODO: exeption
        }
    }
}

module.exports = imageUtils, imageUrl;