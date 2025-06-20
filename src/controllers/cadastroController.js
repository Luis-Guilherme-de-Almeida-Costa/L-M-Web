const api = require('../../services/axios');

exports.index = (req, res) => {
    res.render("cadastro");
}

exports.store = async (req, res) => {
    try{ 
        if(req.body.senha != req.body.confirmarSenha) {
            req.flash('errors', 'As senhas não são compatíveis.');
            req.session.save(function(){
                return res.redirect(req.get('Referrer') || '/register/index');
            });
        }

        const response = await api.post('/auth/register/', {
            nome: req.body.nome,
            email: req.body.email,
            cpf: req.body.cpf,
            senha: req.body.senha
        });
        
        req.flash('success', response.data.message);

        return req.session.save(function(){
            return res.redirect(req.get('/login/') || '/login');
        });
    } catch(error){
        if (error.response) {
            console.log(error.response.data.errors);

            req.flash('errors', error.response.data.errors);
          } else {
            req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
        }
        req.session.save(function(){
            return res.redirect(req.get('Referrer') || '/register/index');
        });
    }
};