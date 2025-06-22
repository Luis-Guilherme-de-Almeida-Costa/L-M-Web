exports.index = (req, res) => {
    res.render("formaDePagamento", { path: "A"});
}

exports.store = async (req, res) => {
    try {
        const response = await api.post('/auth/login/', {
            email: req.session.email,
        });

        

    } catch (error) {
        
    }
}