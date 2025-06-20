const api = require('../../services/axios');

exports.index = (req, res) => {
  if(req.session.email) return res.render('/');
  return res.render('login', { path: 'A' });
};

exports.store = async function(req, res) {
  try {
    const response = await api.post('/auth/login/', {
      email: req.body.email,
      senha: req.body.senha
    });
    
    req.session.email = response.data.message.email;
    //req.session.token = response.data.message.token;
    req.session.save(function() {
      return res.redirect(req.get('/') || '/');
    });
  } catch(error) {
    if (error.response) {
            console.log(error.response.data.errors);
            req.flash('errors', error.response.data.errors);
          } else {
            req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
        }
    return res.render('404');
  }
};

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};

