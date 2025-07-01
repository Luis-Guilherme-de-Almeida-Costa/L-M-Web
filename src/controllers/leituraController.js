const api = require('../../services/axios');

exports.index = async (req, res) => {
    res.render("leitura", { path: "logado", pathStatus: 'LI' });
}