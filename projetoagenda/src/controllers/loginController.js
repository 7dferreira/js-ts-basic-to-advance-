const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('login');
};

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body);        // 1 - instancia da classe
        await login.register();                   // 2 - desencadeia o método register no model.

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);    // 6 - se der algum erro precisamos de garantir que a mensagem aparece na página inicial.
            req.session.save(function() {
                return res.redirect('/');
            });

            return;
        }

        req.flash('success', 'A sua conta foi criada com sucesso.'); // 7 - se a conta for criada com sucesso apresentamos uma flass msg.
        req.session.save(function() {
            return res.redirect('/');
        });    
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function(req, res) {
    try {
        const login = new Login(req.body);       
        await login.login();                   

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);    
            req.session.save(function() {
                return res.redirect('/');
            });

            return;
        }

        req.flash('success', 'Utilizador logado.');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/');
        });    
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
};