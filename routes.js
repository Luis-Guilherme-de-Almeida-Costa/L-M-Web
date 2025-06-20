const express = require('express');
const route = express.Router();

const cadastroController = require("./src/controllers/cadastroController");
const homeSemLoginController = require("./src/controllers/homeSemLoginController")
const homeLoginController = require("./src/controllers/homeLoginController")
const loginController = require("./src/controllers/loginController");
const esqueciController = require("./src/controllers/esqueciController");
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeSemLoginController.index);
route.get('/home', loginRequired, homeLoginController.index);

/*
//Rota de pesquisa
route.get('/home/search/index', searchController.index);

//Rota de perfil
route.get('/home/perfil/index', perfilController.index);

//Rota de leitura
route.get('/home/leitura/', leituraController.index)
*/
// Rotas de login
route.get('/login/index', loginController.index);

route.get('/register/index', cadastroController.index);
route.post('/register/register', cadastroController.store);

route.get('/login/esqueci/index', esqueciController.index);
//route.get('/login/esqueci/esqueci', esqueciController.store);
/*
//pagamento
route.get('/home/pagamento/index', loginRequired, pagamentoController.index);

route.get('/home/pagamento/boleto/index', loginRequired, boletoController.index);
route.post('/home/pagamento/boleto/boleto', loginRequired, boletoController.store);

route.get('/home/pagamento/cartao/index', loginRequired, cartaoController.index);
route.post('/home/pagamento/cartao/cartao', loginRequired, cartaoController.store);

route.get('/home/pagamento/pix/index', loginRequired, pixController.index);
route.get('/home/pagamento/pix/pix', loginRequired, pixController.store);
*/
// route.get('/login/logout', loginController.logout);

// Rotas de contato


module.exports = route;
