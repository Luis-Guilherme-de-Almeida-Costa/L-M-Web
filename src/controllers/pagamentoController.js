const api = require('../../services/axios');

exports.index = (req, res) => {
    res.render("formaDePagamento", { path: "A"});
}