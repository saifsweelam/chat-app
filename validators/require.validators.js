const { validationResult } = require('express-validator');

/** @type {import("express").RequestHandler} */
module.exports = (req, res, next) => {
    let validation = validationResult(req);
    if (!validation.isEmpty()) {
        req.flash('error', validation.array().map(e => e.msg));
        return res.redirect('back');
    }

    next();
}