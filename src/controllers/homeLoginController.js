const api = require('../../services/axios');

exports.index = async (req, res) => {
    try {
        const response = await api.get("/");

        const acao = await api.get("/acao");

        return res.render("homeComLogin", { path: "logado", pathStatus: 'L', livros: response.data.livros, acao: acao.data.livros });
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