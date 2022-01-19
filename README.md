# servicios-bael
Aplicacion que muestra y actualiza diariamente el servicio de trenes de bael

## Descripcion
Este proyecto ademas de ser una aplicacion util en mi dia a dia nace de la necesidad de practicar y reforsar todos los conceptos teoricos y practicos aprendidos en mi carrera de analista de sistemas.
Por lo que si bien la aplicacion en esencia es simple tiene elementos de la arquitectura de software que le brindan un bajo acoplamiento en los componentes y separa lo mas posible, las diferentes capas del sistema.
Utilizando para esto interfaces, patrones de diseño y arquitectura hexagonal.

## Instalacion del proyecto
Si esta interesado en probar mi solucion puede instalarla siguiendo los siguientes pasos.
1. descargar o clonar el repositorio desde `https://github.com/Andres-Fernandez-Caballero/servicios-bael.git`
2. dentro de la carpeta del proyecto copie el archivo `.env.example` y configure las variables de entorno.
3. `DATABASE_PROVIDER` tiene actualmente solo dos opciones `localstorage` si elige almacenamiento local no es necesario completar los campos `DATABASE_USER` y `DATABASE_PASSWORD` y `mongodb` esta ultima solo es funcional a mi cuenta por lo que una opcion valida de momento
4. `CRON_JOBS` variable de entorno es booleana y estando en `true` permite al gestor interno ejecutar una actualizacion de los servicios diariamente, si se encuentra en `false` no hara esa actualizacion, pero siempre puede usar el script `action.js` de la carpeta `src/microservices/cron-tasks` 
5. abrir un terminal de consola y ejecutar `npm install` o `yarn` dependiendo del gestor de paquetes que utilize
6. una vez instaladas las librerias en el terminal de comandos ejecute `npm run start` o `yarn start`
7. en la terminal vera un mensaje de consola indicando donde esta alojado el servidor puede oprimirlo para que lo redirija o abrirlo desde su explorador web preferido
8. ESO ES TODO 

## Proximas mejoras
* Agrear una api rest para poder conectar con una futura aplicacion de react
* Mejorar la logica de conexion a base de datos para que sea mas rapida
* Escalar a mas cantidad de servicios

