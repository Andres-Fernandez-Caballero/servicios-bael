const express = require('express');
const path = require('path');
const serviceController = require("./services/controllers/service.controller");


const app = express();

const assetsPath = path.join(__dirname,  'assets');

console.log(assetsPath)

app.use(express.static(assetsPath));

app.get('/', serviceController.index);



module.exports = app;

