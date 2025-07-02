const api = require('../../services/axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.index = (req, res) => {
    res.render("esqueciMinhaSenha", { path: "naoLogado", pathStatus: 'A' });
}


exports.store = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    req.flash('errors', 'E-mail é obrigatório.');
    return req.session.save(function(){
        return res.redirect(req.get('Referrer') || '/login/esqueci/index');
    });
  }

  try {
    const response = await api.post('/auth/profile', {
        email
    });

    const token = await api.post('/token/', {
        email
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,   
        pass: process.env.PASS,       
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperação de Senha - L&M',
      html: `
        <h2>Recuperação de Senha</h2>
        <p>Olá, recebemos uma solicitação para redefinir sua senha.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="http://localhost:3000/login/esqueci/redefinir/index/${token.data.token}">Redefinir Senha</a>
        <p>Se você não solicitou isso, ignore este e-mail.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    req.flash('success', 'E-mail de recuperação enviado com sucesso.');
    return req.session.save(function() {
        return res.redirect('/login/esqueci/index');
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    if (error.response) {
        req.flash('errors', error.response.data.errors);
      } else {
        req.flash('errors', ['Erro desconhecido. Verifique a conexão com o servidor.'])
      }
      return req.session.save(function(){
          return res.redirect(req.get('Referrer'));
      });
  }
};
