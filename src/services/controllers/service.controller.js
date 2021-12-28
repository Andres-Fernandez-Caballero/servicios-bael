const {getActualService} = require("./../dao/servicesDao");


const  serviceController = {
    index: (req, res) => {
        const service = getActualService();
        res.render('index', {service });
    }
}

module.exports = serviceController;