// express é uma micro-framework que nos vai ajudar a trabalhar com a web.
// vai ajudar-nos também a trabalhar nas rotas da nossa aplicação.
require('dotenv').config();

const express = require('express');
const app = express();

// conexão à base de dados
const mongoose = require('mongoose');

// utilizamos uma promise, pq n queremos em nenhum momento que o utilizador acesse o site sem quem a db seja inicializada.
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('ready');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const { globalMiddleware } = require('./src/middlewares/middleware');

// quando alguém fizer post req.body jutamente com urlencode devolve um objeto com o que foi postado.
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'asd',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 25 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(globalMiddleware);
app.use(routes);

//         Criar   ler   atualizar apagar
// CRUD -> CREATE, READ, UPDATE,   DELETE
//         POST    GET   PUT       DELETE

// http://meusite.com/ <- GET -> Entregue a página /
// http://meusite.com/sobre <- GET -> Entregue a página /sobre
// http://meusite.com/contato <- GET -> Entregue a página /contato

// app.get('/tests/:userId?/:parameters?', (req, res) => {
//     console.log(req.params);
//     res.send(req.params);
// })

// app.post('/', (req, res) => {
//     console.log(req.body);
//     res.send(`Olá ${req.body.nome}`)                // a chave nome vem do input name: nome.
// });

app.on('ready', () => {
    app.listen(3000, () => {
    console.log('http://localhost:3000');
    console.log('Servidor iniciado na porta 3000');
    });
});


