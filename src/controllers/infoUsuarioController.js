const api = require('../../services/axios');

exports.index = async (req, res) => {
    try {

        const response = await api.post('/auth/profile', {
            email: req.body.email,
            senha: req.body.senha
        });

        res.render("infoUsuario", { path: 'A', response });
    } catch(error) {
        if (error.response) {
            req.flash('errors', error.response.data.errors);
        } else {
            req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
        }
        return req.session.save(function(){
            return res.redirect(req.get('Referrer') || '/home');
        });
  }


}