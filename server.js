require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
// const helmet = require('helmet'); // helmet começou a causar problemas no localhost por conta da falta de SSL
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// app.use(helmet()); // helmet começou a causar problemas no localhost por conta da falta de SSL

const whiteList = [ 'http://localhost:3002', 'http://localhost:3000' ];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET_SESSIONS,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true
  }
}));
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


app.use(middlewareGlobal);

app.use(routes);

app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('Servidor executando na porta 3000');
});
