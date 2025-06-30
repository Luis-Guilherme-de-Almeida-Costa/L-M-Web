const api = require('../../services/axios');

exports.index = async (req, res) => {
    if(req.query.searchData) {
        const search = req.query.searchData;

        try {
            const response = await api.post("/search", {
                search
            });

            console.log(response.data);

            res.render("search", { path: "logado", pathStatus: 'LI', livros: response.data });
        } catch (error) {
            if (error.response) {
                req.flash('errors', error.response.data.errors);
            } else {
                req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
            }
            return req.session.save(function(){
                //arruamar return res.redirect(req.get('/home/search/index'));
            });
        }
    } else {
        res.redirect('/home')
    }
}