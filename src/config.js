const dotenv = require('dotenv');
dotenv.config();

const appConfig = {
    ENVIRONMENT: process.env.NODE_ENV || process.env.DEPLOY_MODE  || 'development', //'production' | 'development' | 'test'
    PORT: process.env.PORT || 3000,
    APP_NAME: 'Servicios Diarios',

    MICROSERVICES: {
        cornTasksEnabled: process.env.CRON_JOBS || false,
    }
}

module.exports = appConfig;