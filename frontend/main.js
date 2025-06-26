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

if (path === '/perfil/index'){
  import ('./assets/css/infoUsuario.css').then(() => console.log("O.O"));
}

if (path === '/') {
  import('./assets/css/styleNaoLogado.css').then(() => console.log("O.O"))
  import('./assets/css/stylesFooter.css').then(() => console.log("O.O"))
}

if (path === '/pagamento/index') {
  import('./assets/css/pagamento.css').then(() => console.log("O.O"))
}

if(path === '/pagamento/cartao/leitor/index' || path === '/pagamento/boleto/leitor/index' || path === '/pagamento/pix/leitor/index') {
  import('./assets/css/infoUsuario.css').then(() => console.log("O.O"))
}


if(path === '/pagamento/cartao/autor/index' || path === '/pagamento/boleto/autor/index' || path === '/pagamento/pix/autor/index') {
  import('./assets/css/infoUsuario.css').then(() => console.log("O.O"))
}

if(path === '/pagamento/pix/leitor/index' || '/pagamento/pix/autor/index' || '/perfil/index') {
  import('./assets/css/sobraBackground.css').then(() => console.log("O.O"))
}