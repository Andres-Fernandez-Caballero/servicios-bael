const configApp = require('./../config');

console.log('----------------------------------------');
console.log('App Name: ' + configApp.APP_NAME);
console.log('Environment: ' + configApp.ENVIRONMENT);
console.log('Port: ' + configApp.PORT);
console.log('Microservices: ' + configApp.MICROSERVICES.cornTasksEnabled);
console.log('----------------------------------------');