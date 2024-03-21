const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body);        // 1 - instancia da classe
        await login.register();                   // 2 - desencadeia o método register no model.

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);    // 6 - se der algum erro precisamos de garantir que a mensagem aparece na página inicial.
            req.session.save(function() {
                return res.redirect('/login/index');
            });

            return;
        }

        req.flash('success', 'A sua conta foi criada com sucesso.'); // 7 - se a conta for criada com sucesso apresentamos uma flass msg.
        req.session.save(function() {
            return res.redirect('/login/index');
        });    
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};