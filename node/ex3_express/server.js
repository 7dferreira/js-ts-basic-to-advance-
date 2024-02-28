// express é uma micro-framework que nos vai ajudar a trabalhar com a web.
// vai ajudar-nos também a trabalhar nas rotas da nossa aplicação.

const express = require('express');
const app = express();
const routes = require('./routes');

app.use(                    // quando alguém fizer post req.body jutamente com urlencode devolve um objeto com o que foi postado.
    express.urlencoded(
        { 
            extended: true 
        }
    )
); 

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

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});

