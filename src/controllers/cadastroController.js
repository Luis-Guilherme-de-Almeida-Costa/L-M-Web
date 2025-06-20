const api = require('../../services/axios');

exports.index = (req, res) => {
    res.render("cadastro", { path: 'A' });
}

exports.store = async (req, res) => {
    try{ 
        if(req.body.senha != req.body.confirmarSenha) {
            req.flash('errors', 'As senhas não são compatíveis.');
            return req.session.save(function(){
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
            return res.redirect('/login/index');
        });
    } catch(error){
        if (error.response) {
            console.log(error.response.data.errors);

            req.flash('errors', error.response.data.errors);
          } else {
            req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
        }
        return req.session.save(function(){
            return res.redirect(req.get('Referrer') || '/register/index');
        });
    }
};