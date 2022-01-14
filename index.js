const app = require('./src/app');
const appConfig = require("./src/config");
const cronTasks = require('./src/microservices/cron-tasks/index');

if(appConfig.microservicesConfigs.MICROSERVICES.cornTasksEnabled){
    cronTasks();
}

app.listen(appConfig.serverConfigs.PORT, () => {
    console.log('--------------------------------')
    console.log('Servicor Iniciado')
    console.log(`MODO: ${appConfig.serverConfigs.ENVIRONMENT}`)
    console.log('Puede ingresar localmente en')
    console.log(`http://localhost:${appConfig.serverConfigs.PORT}`)
    console.log('--------------------------------')
})
