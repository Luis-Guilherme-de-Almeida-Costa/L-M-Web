exports.index = (req, res) => {
    console.log(req.session.email);
    return res.render("homeSemLogin", { path: "I" });
}