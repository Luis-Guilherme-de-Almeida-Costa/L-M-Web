exports.index = (req, res) => {
    res.render("pagarComPix", { path: 'A' });
}

exports.store = (req, res) => {
    let errors = [];

    const { nome, cpf } = req.body;

    if (!nome || nome.length < 3 || nome.length > 100) {
        errors.push("Nome completo deve ter entre 3 e 100 caracteres.");
    }

    if (!/^\d{11}$/.test(cpf)) {
        errors.push("CPF deve conter exatamente 11 dígitos numéricos.");
    }

    if (errors.length > 0) {
        req.flash('errors', errors);
        return req.session.save(function(){
            return res.redirect(req.get('Referrer') || '/pagamento/pix/index');
        });
    }

    return res.flash("success", "Pagamento via PIX processado com sucesso!");
}
