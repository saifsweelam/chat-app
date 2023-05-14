/** @type {import("express").RequestHandler} */
exports.requiresAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');

    next();
}

/** @type {import("express").RequestHandler} */
exports.requiresNoAuth = (req, res, next) => {
    if (req.session.user) return res.redirect('/');

    next();
}

