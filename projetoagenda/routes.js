const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactsController = require('./src/controllers/contactsController');

const { loginRequired } = require('./src/middlewares/middleware');

// home routes
route.get('/', homeController.index);

// login routes
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// contact routes
route.get('/contacts/index', loginRequired, contactsController.index);
route.post('/contacts/register', loginRequired, contactsController.register);
route.get('/contacts/index/:id', loginRequired, contactsController.editIndex);
route.post('/contacts/edit/:id', loginRequired, contactsController.edit);

module.exports = route;