const express = require('express');
const route = express.Router();

const cadastroController = require("./src/controllers/cadastroController");
const homeSemLoginController = require("./src/controllers/homeSemLoginController")
const homeLoginController = require("./src/controllers/homeLoginController")
const loginController = require("./src/controllers/loginController");
const esqueciController = require("./src/controllers/esqueciController");
const pagamentoController = require("./src/controllers/pagamentoController");
const infoUsuarioController = require('./src/controllers/infoUsuarioController');
const boletoController = require('./src/controllers/boletoController');
const pixController = require('./src/controllers/pixController');
const cartaoController = require('./src/controllers/cartaoController');
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeSemLoginController.index);
route.get('/home', loginRequired, homeLoginController.index);

/*
//Rota de pesquisa
route.get('/home/search/index', searchController.index);

//Rota de leitura
route.get('/home/leitura/', leituraController.index)
*/

//Rota de perfil
// Erro com o path. Arrumar depois.
route.get('/perfil/index', loginRequired, infoUsuarioController.index);
route.post('/perfil/perfil', loginRequired, infoUsuarioController.update);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.store);
route.get('/login/logout', loginController.logout);

route.get('/register/index', cadastroController.index);
route.post('/register/register', cadastroController.store);

route.get('/login/esqueci/index', esqueciController.index);
//route.get('/login/esqueci/esqueci', esqueciController.store);
//pagamento
route.get('/pagamento/index', loginRequired, pagamentoController.index);

route.get('/pagamento/boleto/index', loginRequired, boletoController.index);
route.post('/pagamento/boleto/boleto', loginRequired, async (req, res) => {
    await boletoController.store(req, res);
    await pagamentoController.store(req, res);
});

route.get('/pagamento/cartao/index', loginRequired, cartaoController.index);
route.post('/pagamento/cartao/cartao', loginRequired, async (req, res) => {
    await cartaoController.store(req, res);
    await pagamentoController.store(req, res);
});

route.get('/pagamento/pix/index', loginRequired, pixController.index);
route.post('/pagamento/pix/pix', loginRequired, async (req, res) => {
    await pixController.store(req, res);
    await pagamentoController.store(req, res);
});


// Rotas de contato


module.exports = route;
