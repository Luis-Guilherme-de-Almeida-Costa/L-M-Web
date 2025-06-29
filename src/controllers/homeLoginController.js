exports.index = (req, res) => {
    return res.render("homeComLogin", { path: "logado", pathStatus: 'L' });
}