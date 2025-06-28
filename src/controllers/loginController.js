const api = require('../../services/axios');

exports.index = (req, res) => {
  return res.render('login', { path: 'A' });
};

exports.store = async function(req, res) {
  try {
    const response = await api.post('/auth/login/', {
      email: req.body.email,
      senha: req.body.senha
    });

    req.session.user = response.data.user;
    req.session.email = response.data.email;
    
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

