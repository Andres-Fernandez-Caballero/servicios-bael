const app = require('./src/app');
const appConfig = require("./src/config");


app.listen(appConfig.PORT, () => {
    console.log('servicor escuchando en el puerto ' + appConfig.PORT) })

