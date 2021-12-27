const dotenv = require('dotenv');
dotenv.config();

const appConfig = {
    PORT: process.env.PORT,
    APP_NAME: 'Servicios Diarios'
}

module.exports = appConfig;