exports.inicialPage = (req, res) => {   // o cliente faz uma req, o servidor entrega a resp dessa req.   
    res.send(`
    <form action="/" method="POST">
    Nome do cliente: <input type="text" name="nome">
    <button>Olá mundo</button>
    </form>
    `);
};

exports.userForm = (req, res) => {
    res.send(`Bem vindo, ${req.body.nome}!`);
};