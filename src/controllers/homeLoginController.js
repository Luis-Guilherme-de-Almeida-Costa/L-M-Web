const api = require('../../services/axios');

exports.index = async (req, res) => {
    try {
        const response = await api.get("/");

        const acao = await api.get("/acao");

        const favoritoResponse = await api.post('/leitura/favorites/index', {
            email: req.session.email
        });

        return res.render("homeComLogin", { path: "logado", pathStatus: 'L', livros: response.data.livros, acao: acao.data.livros, favoritos: favoritoResponse.data.favoritos });
    } catch (error) {
        if (error.response) {
            req.flash('errors', error.response.data.errors);
        } else {
            req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
        }
        return req.session.save(function(){
            return res.redirect(req.get('/home/'));
        });
    }
}