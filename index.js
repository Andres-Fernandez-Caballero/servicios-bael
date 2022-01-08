const app = require('./src/app');
const appConfig = require("./src/config");
const cronTasks = require('./src/microservices/cron-tasks/index');

if(appConfig.MICROSERVICES.cornTasksEnabled){
    cronTasks();
}

app.listen(appConfig.PORT, () => {
    console.log(`--------------------------------\nServicor Iniciado\nPuede ingresar localmente en\nhttp://localhost:${appConfig.PORT}\nen modo ${appConfig.ENVIRONMENT}\n--------------------------------` ) });

