exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

// se existir algum erro com o csrf e para não expormos os erros da nossa aplicação, criamos este middleware.
exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    }

    next();
};

// a var crsfToken vai estar disponivel dentro de todas as views.
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

// se o user tentar criar um contacto sem primeiro fazer login, vai aparecer um erro e o user vai ser redirecionado para a home.
// ao chamar req.session.save() antes de redirecionar, garantimos que quaisquer alterações na sessão sejam salvas imediatamente, 
// antes que a resposta seja enviada.
exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'A sua conta não está logada');
        req.session.save(() => res.redirect('/'));
        return;
    }

    next();
};