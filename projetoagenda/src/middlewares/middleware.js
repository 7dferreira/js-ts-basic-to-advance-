exports.globalMiddleware = (req, res, next) => {
    res.locals.localVar = 'Este é o valor da variável local.';
    next();
};

// se existir algum erro com o csrf e para não expormos os erros da nossa aplicação, criamos este middleware.
exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code  === 'EBADCSRFTOKEN') {
        return res.render('404');
    }
};

// a var crsfToken vai estar disponivel dentro de todas as views.
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};