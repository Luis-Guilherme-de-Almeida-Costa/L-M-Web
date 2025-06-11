const express = require('express');
const route = express.Router();

const cadastroController = require("./src/controllers/cadastroController");

//const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', cadastroController.index);
route.post('/', cadastroController.store);

// Rotas de login
/*
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);
*/

// Rotas de contato


module.exports = route;
