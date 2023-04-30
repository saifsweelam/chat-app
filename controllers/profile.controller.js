const usersModel = require('../models/users.model');

/** @type {import("express").RequestHandler} */
exports.getProfile = (req, res, next) => {
    if (!req.params.userId) return res.redirect('/profile/' + req.session.userId);

    usersModel
        .getUserById(req.params.userId)
        .then((user) => {
            res.render('profile/profile', { user: user });
        })
}