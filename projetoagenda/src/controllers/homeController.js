const Contacts = require('../models/ContactsModel');

exports.index = async(req, res) => {  
    if (req.session.user && req.session.user.email) {
        const userId = req.session.user.email;
        const user = req.session.user;
        const contacts = await Contacts.findContacts(userId);
        res.render('index', { contacts, user });
    } else {
        // Caso req.session.user ou req.session.user.email estejam indefinidos
        // Lidar com isso de acordo, talvez redirecionando para outra página ou enviando uma mensagem de erro
        res.status(500).send("Erro: Usuário não está logado ou email não está definido na sessão.");
    }
};

