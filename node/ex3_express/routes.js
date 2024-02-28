const express = require('express');
const route = express.Router();
const homeController = require('./controllers/homeController');
const contactsController = require('./controllers/contactsController');

// home routes
route.get('/', homeController.inicialPage);
route.post('/', homeController.userForm);

// rotas para contacto
route.get('/contacts', contactsController.inicialPage);

module.exports = route;