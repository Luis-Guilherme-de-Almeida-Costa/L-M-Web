require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
// const helmet = require('helmet'); // helmet começou a causar problemas no localhost por conta da falta de SSL
// const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// app.use(helmet()); // helmet começou a causar problemas no localhost por conta da falta de SSL

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Nossos próprios middlewares
/*
app.use(middlewareGlobal);
*/

app.use(routes);

app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('Servidor executando na porta 3000');
});
