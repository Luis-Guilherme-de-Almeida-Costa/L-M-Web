const api = require('../../services/axios');

exports.index = (req, res) => {
  if(req.session.email) return res.render('homeSemLogin');
  return res.render('login', { path: 'A' });
};
/*
C:\Users\Antenor53923246\Desktop\L-M\L-M-Rest_API\dist\controllers\loginController.js:46
                errors: error.errors.map((err) => err.message)
                                     ^

TypeError: Cannot read properties of undefined (reading 'map')
    at index (C:\Users\Antenor53923246\Desktop\L-M\L-M-Rest_API\dist\controllers\loginController.js:46:38)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

Erro da porra do login.
*/

exports.store = async function(req, res) {
  try {
    const response = await api.post('/auth/login/', {
      email: req.body.email,
      senha: req.body.senha
    });

    req.session.user = response.data.user;
    req.session.email = response.data.email;
    //req.session.token = response.data.message.token;
    return req.session.save(function() {
      return res.redirect('/');
    });
  } catch(error) {
      if (error.response) {
        req.flash('errors', error.response.data.errors);
      } else {
        req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
      }
      return req.session.save(function(){
          return res.redirect(req.get('Referrer') || '/login/index');
      });
  }
};

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};

