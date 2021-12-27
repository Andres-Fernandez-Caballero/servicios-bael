const ImageUtils = require('../../utils/image.utils')
const imageUtils = require("../../utils/image.utils");

const servicesList = [
    'proximo-franco',
    39,
    40,
    41,
    42,
    43,
    'proximo-franco'
];

class Service {
    constructor(code, date) {
        this.code = code;
        this.date = date;
        this.image = imageUtils.getImageByDayOfWeek(code, date);
    }

    getImage() {
        return this.image;
    }
}


module.exports = {
    servicesList,
    Service
}
