// const HomeModel = require('../models/HomeModel');

/* HomeModel.create({
    titulo: 'Titulo de testes',
    descricao: 'Descrição de testes.'
})
    .then(dados => console.log(dados))
    .catch(e => console.log(e)); */

exports.inicialPage = (req, res) => {   // o cliente faz uma req, o servidor entrega a resp dessa req.   
    res.render('index', {
        titulo: 'Este será o titulo da página',
        numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    });
    return;
};

exports.userForm = (req, res) => {
    res.send(`Bem vindo, ${req.body.nome}!`);
    return;
};