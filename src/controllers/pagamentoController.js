exports.index = (req, res) => {
    res.render("formaDePagamento", { path: "A", url1: '/pagamento/cartao/leitor/index', url2: '/pagamento/boleto/leitor/index', url3: '/pagamento/pix/leitor/index' });
}