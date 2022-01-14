require('dotenv').config();


const appConfig = {

    serverConfigs: {
        ENVIRONMENT: process.env.NODE_ENV || process.env.DEPLOY_MODE  || 'production',
        PORT: process.env.PORT || 3000,
        APP_NAME: 'Servicios Diarios',
    },

    databaseConfigs: {
        DATABASE_PROVIDER: process.env.DATABASE_PROVIDER,
        DATABASE_USER: process.env.DATABASE_USER || 'root',
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
        DATABASE_URL: process.env.DATABASE_URL || 'http://localhost',
    },

    microservicesConfigs: {
        MICROSERVICES: {
            cornTasksEnabled: process.env.CRON_JOBS || false,
        }
    },

}

module.exports = appConfig;