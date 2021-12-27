const {getActualService} = require("./../dao/servicesDao");
const path = require('path');


const  serviceController = {
    index: (req, res) => {
        res.send(
            `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                <title>Servicios hoy</title>
            </head>
            <body>
                <main class="container-fluid mx-auto">
                    <h1>Servicio de hoy</h1>
                    <img class="image-fluid rounded mx-auto d-block"  width="600" src="/servicios/${getActualService().image}" alt="servicio ${getActualService().code}">
                </main>
            </body>
            </html>
            `);
    }
}

module.exports = serviceController;