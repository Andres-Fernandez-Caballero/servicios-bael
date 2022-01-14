const express = require('express');
const path = require('path');
const serviceController = require("./services/controllers/service.controller");

const app = express();

const assetsPath = path.join(__dirname,  'assets');
const publicPath = path.join(__dirname, '/../public')
console.log(publicPath);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(assetsPath));
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: true }))

app.get('/', serviceController.index);
app.get('/week',serviceController.setCurrentWeek);
app.post('/week', serviceController.storeCurrentWeek);

module.exports = app;

