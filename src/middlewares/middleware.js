exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.email
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

exports.alreadyAss = (req, res, next) => {
  if(req.session.ass) {
    req.session.save(() => res.redirect('/home'));
    return;
  } 

  next();
}

// para verificar se o usuário tem assinatura ou não, basta criar um post na rest api que verifica utilizando o req.session.email!