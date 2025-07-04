const api = require('../../services/axios');

exports.index = (req, res) => {
    res.render("pagarComBoleto", { path: "naoLogado", pathStatus: 'A', url: '/pagamento/boleto/leitor/boleto' });
}

exports.store = async (req, res) => {
    const errors = [];

    const { nome, email, endereco, cep, cpf } = req.body;

    if (!nome || nome.length < 3 || nome.length > 55) {
        errors.push("Nome completo deve ter entre 3 e 55 caracteres.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push("E-mail inválido.");
    }

    if (!endereco || endereco.length < 5 || endereco.length > 150) {
        errors.push("Endereço deve ter entre 5 e 150 caracteres.");
    }

    if (!/^\d{8}$/.test(cep)) {
        errors.push("CEP deve conter exatamente 8 dígitos numéricos.");
    }

    if (!/^\d{11}$/.test(cpf) && !/^\d{14}$/.test(cpf)) {
        errors.push("Informe um CPF com 11 dígitos ou CNPJ com 14 dígitos numéricos.");
    }

    if (errors.length > 0) {
        req.flash('errors', errors);
        return req.session.save(function(){
            return res.redirect(req.get('Referrer') || '/pagamento/boleto/leitor/index');
        });
    }

    try {
        const response = await api.post('/payment/index/', {
            email: req.session.email
        });
        
        req.flash("success", "Pagamento processado com sucesso!");
        
        return req.session.save(function() {
            res.redirect(req.get('Referrer') || '/pagamento/boleto/leitor/index');
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
};