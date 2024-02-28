// express é uma micro-framework que nos vai ajudar a trabalhar com a web.
// vai ajudar-nos também a trabalhar nas rotas da nossa aplicação.

const express = require('express');
const app = express();

//         Criar   ler   atualizar apagar
// CRUD -> CREATE, READ, UPDATE,   DELETE
//         POST    GET   PUT       DELETE

// http://meusite.com/ <- GET -> Entregue a página /
// http://meusite.com/sobre <- GET -> Entregue a página /sobre
// http://meusite.com/contato <- GET -> Entregue a página /contato

app.get('/', (req, res) => {    // o cliente faz uma req, o servidor entrega a resp dessa req.
    res.send('Hello world');
});

app.get('/contato', (req, res) => {
    res.send('Obrigado pela sua visita');
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});

