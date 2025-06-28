import 'core-js/stable';
import 'regenerator-runtime/runtime';

const path = window.location.pathname;

import './assets/css/styleGeneral.css';

if (path === '/') {
  import('./assets/css/styleNaoLogado.css').then(() => console.log("O.O"))
  import('./assets/css/stylesFooter.css').then(() => console.log("O.O"))
}

if (path.includes('/register') || path.includes('/login')) {
  import('./assets/css/styleAutenticacao.css')
    .then(() => console.log("o.o"));
  import('./assets/css/sobraBackground.css').then(() => console.log("O.O"));
}

if (path === '/perfil/index'){
  import ('./assets/css/infoUsuario.css').then(() => console.log("O.O"));
}

if (path === '/pagamento/index') {
  import('./assets/css/pagamento.css').then(() => console.log("O.O"))
}

if(path === '/pagamento/cartao/leitor/index' || path === '/pagamento/boleto/leitor/index' || path === '/pagamento/pix/leitor/index') {
  import('./assets/css/infoUsuario.css').then(() => console.log("O.O"))
  import('./assets/css/sobraBackground.css').then(() => console.log("O.O"))
}


if(path === '/pagamento/cartao/autor/index' || path === '/pagamento/boleto/autor/index' || path === '/pagamento/pix/autor/index') {
  import('./assets/css/infoUsuario.css').then(() => console.log("O.O"))
  import('./assets/css/sobraBackground.css').then(() => console.log("O.O"))
}

if(path === '/pagamento/pix/leitor/index' || path === '/pagamento/pix/autor/index' || path === '/perfil/index' || path === '/login/esqueci/index') {
  import('./assets/css/sobraBackground.css').then(() => console.log("O.O"))
}