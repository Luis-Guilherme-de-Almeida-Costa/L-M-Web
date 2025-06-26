const api = require('../../services/axios');

exports.index = async (req, res) => {
    try {
        const response = await api.post('/auth/profile', {
            email: req.session.email
        });

        res.render("infoUsuario", { path: 'A', usuario: response.data });
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

exports.update = async (req, res) => {
    try {
        const id = await api.post('/auth/profile', {
            email: req.session.email
        });

        const response = await api.put('/auth/profile/update', {
            id_pessoa: id.data.id_pessoa,
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email
        });

        req.session.user = req.body.nome;
        req.session.email = req.body.email;

        req.flash('success', response.data.message);

        return req.session.save(function() {
            return res.redirect('/perfil/index');
        });

    } catch (error) {
        if (error.response) {
            req.flash('errors', error.response.data.errors);
        } else {
            req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
        }
        return req.session.save(function(){
            return res.redirect(req.get('Referrer') || '/perfil/index');
        });
    }
}