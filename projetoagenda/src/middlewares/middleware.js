exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
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