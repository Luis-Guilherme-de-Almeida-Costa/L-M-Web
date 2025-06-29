exports.index = (req, res) => {
    if(req.query.searchData) {
        

        res.render("search", { path: "logado", pathStatus: 'LI' });
    } else {
        res.redirect('/home')
    }
}