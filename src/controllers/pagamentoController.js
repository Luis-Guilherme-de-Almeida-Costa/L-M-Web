const api = require('../../services/axios');

exports.index = (req, res) => {
    res.render("formaDePagamento", { path: "A"});
}

exports.store = async (req, res) => {
    try {
        const response = await api.post('/payment/index/', {
            email: req.session.email
        });

        req.session.ass = response.data.message;
        
        req.session.save(function() {
            return res.redirect('/home');
        });
    } catch (error) {
        if (error.response) {
            req.flash('errors', error.response.data.errors);
          } else {
            req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
            console.log(error)
          }
        return req.session.save(function(){
            return res.redirect(req.get('Referrer'));
        });
    }
}