const api = require('../../services/axios');

exports.index = (req, res) => {
    res.render("pagarComCartao", { path: "naoLogado", pathStatus: 'A', url: '/pagamento/cartao/leitor/cartao' });
}

exports.store = async (req, res) => {
    let errors = [];

    const {
        nome,
        sobrenome,
        cpf,
        numeroCartao,
        validade,
        cvv
    } = req.body;

 
    if (!nome || nome.length < 3 || nome.length > 55) {
        errors.push("Campo nome deve ter entre 3 e 55 caracteres.");
    }

   
    if (!sobrenome || sobrenome.length < 3 || sobrenome.length > 55) {
        errors.push("Campo sobrenome deve ter entre 3 e 55 caracteres.");
    }

 
    if (!/^\d{11}$/.test(cpf)) {
        errors.push("CPF deve conter exatamente 11 dígitos numéricos.");
    }

    if (numeroCartao.length > 19 && numeroCartao.length < 13) {
        errors.push("Número do cartão deve conter entre 13 e 19 dígitos numéricos.");
    }

    if (!/^\d{2}\/\d{2}$/.test(validade)) {
        errors.push("Data de validade deve estar no formato MM/AA.");
    } else {
        const [mes, ano] = validade.split('/').map(Number);
        const agora = new Date();
        const anoAtual = agora.getFullYear() % 100; 
        const mesAtual = agora.getMonth() + 1;

        if (mes < 1 || mes > 12) {
            errors.push("Mês de validade inválido.");
        } else if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
            errors.push("Cartão expirado.");
        }
    }

    
    if (!/^\d{3,4}$/.test(cvv)) {
        errors.push("Código de segurança (CVV) deve conter 3 ou 4 dígitos numéricos.");
    }

    if (errors.length > 0) {
        req.flash('errors', errors);
        return req.session.save(function(){
            return res.redirect(req.get('Referrer') || '/pagamento/cartao/leitor/index');
        });
    }
    console.log('chegou aqui3')
    try {
        const response = await api.post('/payment/index/', {
            email: req.session.email
        })
        
        req.flash("success", "Pagamento processado com sucesso!");
        return req.session.save(function() {
            return res.redirect('/pagamento/cartao/leitor/index');
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