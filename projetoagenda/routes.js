const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contactsController = require('./src/controllers/contactsController');

// home routes
route.get('/', homeController.inicialPage);
route.post('/', homeController.userForm);

// rotas para contacto
route.get('/contacts', contactsController.inicialPage);

module.exports = route;