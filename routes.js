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
const boletoControllerAutor = require('./src/controllers/boletoControllerAutor');
const pixController = require('./src/controllers/pixController');
const pixControllerAutor = require('./src/controllers/pixControllerAutor');
const cartaoController = require('./src/controllers/cartaoController');
const cartaoControllerAutor = require('./src/controllers/cartaoControllerAutor');
const redefinirController = require('./src/controllers/redefinirController');
const { loginRequired, assRequired, alreadyAss, alreadyLoggedIn } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', alreadyAss, homeSemLoginController.index);
route.get('/home', loginRequired, assRequired, homeLoginController.index);

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
route.get('/login/index', alreadyLoggedIn, loginController.index);
route.post('/login/login', alreadyLoggedIn, loginController.store);
route.get('/login/logout', loginController.logout);

route.get('/register/index', alreadyLoggedIn, cadastroController.index);
route.post('/register/register', alreadyLoggedIn, cadastroController.store);

route.get('/login/esqueci/index', alreadyLoggedIn, esqueciController.index);
route.post('/login/esqueci/esqueci', alreadyLoggedIn, esqueciController.store);

route.get('/login/esqueci/redefinir/index/:token', alreadyLoggedIn, redefinirController.index);
route.post('/login/esqueci/redefinir/redefinir/:token', alreadyLoggedIn, redefinirController.store);
//pagamento
route.get('/pagamento/index', loginRequired, alreadyAss, pagamentoController.index);
route.get('/pagamento/autor', loginRequired, alreadyAss, pagamentoController.index);

route.get('/pagamento/boleto/leitor/index', loginRequired, alreadyAss, boletoController.index);
route.post('/pagamento/boleto/leitor/boleto', loginRequired, boletoController.store);

route.get('/pagamento/boleto/autor/index', loginRequired, alreadyAss, boletoControllerAutor.index);
route.post('/pagamento/boleto/autor/boleto', loginRequired, boletoControllerAutor.store);

route.get('/pagamento/cartao/leitor/index', loginRequired, alreadyAss, cartaoController.index);
route.post('/pagamento/cartao/leitor/cartao', loginRequired, cartaoController.store);

route.get('/pagamento/cartao/autor/index', loginRequired, alreadyAss, cartaoControllerAutor.index);
route.post('/pagamento/cartao/autor/cartao', loginRequired, cartaoControllerAutor.store);

route.get('/pagamento/pix/leitor/index', loginRequired, alreadyAss, pixController.index);
route.post('/pagamento/pix/leitor/pix', loginRequired, pixController.store);

route.get('/pagamento/pix/autor/index', loginRequired, alreadyAss, pixControllerAutor.index);
route.post('/pagamento/pix/autor/pix', loginRequired, pixControllerAutor.store);


// Rotas de contato


module.exports = route;
