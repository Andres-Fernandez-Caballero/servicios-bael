const appConfig = require('./../../config');
const ServiceDaoMongoDb = require("./ServiceDaoMongoDb");
const ServiceDaoLocalStorage = require("./ServiceDaoLocalStorage");


const DaoBuilder = {
   getDaoService: () => {
        switch (appConfig.databaseConfigs.DATABASE_PROVIDER){
            case 'mongodb':
                return new ServiceDaoMongoDb(appConfig.serverConfigs.ENVIRONMENT);

            case 'localstorage':
                return new ServiceDaoLocalStorage();
            default:
                return null;
        }
   },

}


module.exports = DaoBuilder