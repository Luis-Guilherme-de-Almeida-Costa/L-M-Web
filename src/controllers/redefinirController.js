const api = require('../../services/axios');
const jwt = require('jsonwebtoken');

exports.index = (req, res) => {
  if(req.session.email) return res.render('homeSemLogin');
  const { token } = req.params;
  if(!token) {
    res.status(400).send('Link expirado ou inválido.');
  }
  return res.render('redefinirSenha', { path: "naoLogado", pathStatus: 'A', token });
};

exports.store = async function(req, res) {
  const { token } = req.params;

  const { senha, confirmarSenha } = req.body

  if(senha != confirmarSenha) {
    req.flash('errors', 'As senhas não são compatíveis.');
    return req.session.save(function(){
        return res.redirect(req.get('Referrer'));
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const email = decoded.email;
    
    const response = api.put('/auth/login/update', {
      email, senha
    })

    return req.session.save(function() {
      return res.redirect('/login/index');
    });
  } catch(error) {
      if (error.response) {
        req.flash('errors', error.response.data.errors);
      } else {
        req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
      }
      return req.session.save(function(){
          return res.redirect(req.get('Referrer'));
      });
  }
};

