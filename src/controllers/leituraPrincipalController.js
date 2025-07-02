const api = require('../../services/axios');

exports.index = async (req, res) => {
    if(req.params.id) {
        const livroId = req.params.id;
        
        try {
            const response = await api.post('/leitura', {
                id: livroId
            })
            
            return res.render("leituraPrincipal", { path: "logado", pathStatus: 'LI', livros: response.data.livros[0] });
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
    } else {
        return res.redirect('/home')
    }
}