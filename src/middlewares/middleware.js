exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors') || false;
  res.locals.success = req.flash('success');
  res.locals.email = req.session.email;
  res.locals.token = req.session.token;
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
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
};

exports.assinaturaRequired = (req, res, next) => {
  if(!req.session.assinatura) {
    return;
  }
}
