import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';


const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const path = window.location.pathname;

login.init();
cadastro.init();

import './assets/css/styleGeneral.css';

if (path === '/register/index' || path == "/login/index") {
  import('./assets/css/styleAutenticacao.css')
    .then(() => console.log("o.o"));
}

if (path === '/') {
    import('./assets/css/styleNaoLogado.css').then(() => console.log("O.O"))
    import('./assets/css/stylesFooter.css').then(() => console.log("O.O"))
}
