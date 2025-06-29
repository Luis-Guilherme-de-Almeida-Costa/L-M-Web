const api = require('../../services/axios');

exports.index = (req, res) => {
    res.render("pagarComPix", { path: "naoLogado", pathStatus: 'A', url:'/pagamento/pix/autor/pix'});
}

exports.store = async (req, res) => {
    let errors = [];

    const { nome, cpf } = req.body;

    if (!nome || nome.length < 3 || nome.length > 55) {
        errors.push("Nome completo deve ter entre 3 e 55 caracteres.");
    }
    
    if (!/^\d{11}$/.test(cpf)) {
        errors.push("CPF deve conter exatamente 11 dígitos numéricos.");
    }
    
    if (errors.length > 0) {
        req.flash('errors', errors);
        return req.session.save(function(){
            return res.redirect(req.get('Referrer') || '/pagamento/pix/autor/index');
        });
    }

   
    try {
        const response = await api.post('/payment/autor/', {
            email: req.session.email
        });
        
        req.flash("success", "Pagamento processado com sucesso!");
    
        return req.session.save(function() {
            return res.redirect('/pagamento/pix/autor/index');
        });
    } catch (error) {
        if (error.response) {
            req.flash('errors', error.response.data.errors);
          } else {
            req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
            console.log(error)
          }
        return req.session.save(function(){
            return res.redirect(req.get('/pagamento/pix/autor/index'));
        });
    }
}
