exports.globalMiddleware = (req, res, next) => {
    res.locals.localVar = 'Este é o valor da variável local.';
    next();
};