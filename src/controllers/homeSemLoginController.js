exports.index = (req, res) => {
    return res.render("homeSemLogin", { path: "naoLogado", pathStatus: 'I' });
}