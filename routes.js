const express = require('express');
const route = express.Router();

const cadastroController = require("./src/controllers/cadastroController");

//const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', cadastroController.index);

// Rotas de login
/*
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);
*/

// Rotas de contato
/*
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);
*/

module.exports = route;
