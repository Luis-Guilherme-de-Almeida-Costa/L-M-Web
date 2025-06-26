exports.index = (req, res) => {
    res.render("pagarComBoleto", { path: 'A' });
}

exports.store = (req, res) => {
    const errors = [];

    const { nome, email, endereco, cep, documento } = req.body;

    if (!nome || nome.length < 3 || nome.length > 100) {
        errors.push("Nome completo deve ter entre 3 e 100 caracteres.");
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

    if (!/^\d{11}$/.test(documento) && !/^\d{14}$/.test(documento)) {
        errors.push("Informe um CPF com 11 dígitos ou CNPJ com 14 dígitos numéricos.");
    }

    if (errors.length > 0) {
        req.flash('errors', errors);
        return req.session.save(function(){
            return res.redirect(req.get('Referrer') || '/pagamento/boleto/index');
        });
    }

    return res.flash("success", "Pagamento com boleto processado com sucesso!");
};