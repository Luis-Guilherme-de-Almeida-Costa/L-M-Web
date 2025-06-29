const api = require('../../services/axios');
exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.email) {
    req.flash('errors', 'Você precisa fazer o login.');
    req.session.save(() => res.redirect('/login/index'));
    return;
  }

  next();
};

exports.alreadyLoggedIn = (req, res, next) => {
  if(req.session.email) {
    return req.session.save(() => res.redirect('/'));
  }

  next();
}

exports.alreadyUser = async (req, res, next) => {
  if (req.session.email) {
    try {
      const email = req.session.email;

      // Verifica se é assinante
      const assinanteRes = await api.post('/payment/index/show', { email });
      const ehAssinante = !!assinanteRes.data.message;

      // Se não for assinante, verifica se é autor
      if (!ehAssinante) {
        const autorRes = await api.post('/payment/autor/show', { email });
        const ehAutor = !!autorRes.data.message;

        if (ehAutor) {
          return req.session.save(() => res.redirect('/home'));
        }
      } else {
        return req.session.save(() => res.redirect('/home'));
      }

    } catch (e) {
      console.error('Erro ao verificar permissão:', e);
      return req.session.save(() => res.redirect('/'));
    }
  }

  next();
};

exports.autorOuAssinanteRequired = async (req, res, next) => {
  try {
    const email = req.session.email;

    const assinanteRes = await api.post('/payment/index/show', { email });
    const ehAssinante = !assinanteRes.data.errors;

    if (!ehAssinante) {
      const autorRes = await api.post('/payment/autor/show', { email });
      const ehAutor = !autorRes.data.errors;

      if (!ehAutor) {
        req.flash('errors', 'Você precisa ser um assinante ou autor.');
        return req.session.save(() => res.redirect('/pagamento/index'));
      }
    }
  } catch (e) {
    console.error('Erro ao verificar permissão:', e);
    req.flash('errors', 'Erro ao verificar sua permissão.');
    return req.session.save(() => res.redirect('/pagamento/index'));
  }
  
  next();
};

exports.alreadyUserPerfil = async (req, res, next) => {
  if (req.session.email) {
    try {
      const email = req.session.email;

      const assinanteRes = await api.post('/payment/index/show', { email });
      const ehAssinante = !!assinanteRes.data.message;

      if (!ehAssinante) {
        const autorRes = await api.post('/payment/autor/show', { email });
        const ehAutor = !!autorRes.data.message;

        if (ehAutor) {
          return req.session.save(() => res.redirect('/perfil/logado'));
        }
      } else {
        return req.session.save(() => res.redirect('/perfil/logado'));
      }
    } catch (e) {
      console.error('Erro ao verificar permissão:', e);
      return req.session.save(() => res.redirect('/'));
    }
  }

  next();
};
