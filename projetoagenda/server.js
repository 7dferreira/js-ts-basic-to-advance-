// o padrão que vamos utilizar neste projeto é o mvc.
// express é uma micro-framework que nos vai ajudar a trabalhar com a web.
// vai ajudar-nos também a trabalhar nas rotas da nossa aplicação.

//variáveis de ambiente, dados relacionadas com o ambiente de desenvolvimento que não queremos publicar no nosso repositório.
require('dotenv').config(); 
const express = require('express');
const app = express();

// conexão à base de dados, modelação, criação de schemas.
const mongoose = require('mongoose');

// utilizamos uma promise, pq n queremos em nenhum momento que o utilizador acesse o site sem quem a db seja inicializada.
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('ready');
    })
    .catch(e => console.log(e));

const session = require('express-session');   // utilizamos para identificar o navegador do cliente (cookie, id).
const MongoStore = require('connect-mongo');  // as sessões vão ser salvas dentro da db, pois normalmente são salvas só em memória.
const flash = require('connect-flash');       // flash messagens são mensagens "auto destrutivas" só se lêem uma vez.
const routes = require('./routes');
const path = require('path');
// const helmet = require('helmet');
 // tokens que são criados para cada form da nossa app. para q nenhum site externo entre na nossa app.
const csrf = require('csurf');               
// middlewares são funções q são executadas nas rotas. antes ou depois da res ao cliente. criamos funções q executam no meio do caminho.
const { globalMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// app.use(helmet());
// quando alguém fizer post req.body jutamente com urlencode devolve um objeto com o que foi postado.
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
// arquivos estáticos são todos os arquivos que podem ser acessados diretamente através da nossa app. Ex: img, css, js...
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

// views são os arquivos que renderizamos na tela.
app.set('views', path.resolve(__dirname, 'src', 'views'));
// view engine é o que usamos para renderizar o html, que neste caso é o ejs.
app.set('view engine', 'ejs');

app.use(csrf());  // vamos ejetar o token em todas as páginas, para isso utilizamos os middlewares

// middlewares
app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);
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


