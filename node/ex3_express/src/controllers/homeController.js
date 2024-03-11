const HomeModel = require('../models/HomeModel');

HomeModel.create({
    titulo: 'Titulo de testes',
    descricao: 'Descrição de testes.'
})
    .

exports.inicialPage = (req, res) => {   // o cliente faz uma req, o servidor entrega a resp dessa req.   
    res.render('index');
};

exports.userForm = (req, res) => {
    res.send(`Bem vindo, ${req.body.nome}!`);
};