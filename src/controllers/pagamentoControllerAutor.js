const api = require('../../services/axios');

exports.index = (req, res) => {
    res.render("formaDePagamento", { path: "naoLogado", pathStatus: 'A', url1: '/pagamento/cartao/autor/index', url2: '/pagamento/boleto/autor/index', url3: '/pagamento/pix/autor/index'});
}