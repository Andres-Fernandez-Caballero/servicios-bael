const app = require('./src/app');
const appConfig = require("./src/config");
const croneTasks = require('./src/microservices/cron-tasks/index');


app.listen(appConfig.PORT, () => {
    console.log('servicor escuchando en el puerto ' + appConfig.PORT) })

croneTasks();