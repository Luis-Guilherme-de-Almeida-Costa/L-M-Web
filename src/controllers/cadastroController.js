const api = require('../../services/axios');

exports.index = (req, res) => {
    res.render("cadastro");
}

exports.store = async (req, res) => {
    try{
         
        const response = await api.post('/auth/register/', {
            nome: req.body.nome,
            email: req.body.email,
            cpf: req.body.cpf,
            senha: req.body.senha
        });
        
        console.log(response.data.message);
    } catch(error){
        if (error.response) {
            console.log(error.response.data.errors);
          } else {
            alert('Erro desconhecido. Verifique a conexão com o servidor.');
        }
    }
};