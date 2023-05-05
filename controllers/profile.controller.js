const usersModel = require('../models/users.model');

/** @type {import("express").RequestHandler} */
exports.getProfile = (req, res, next) => {
    if (!req.params.userId) return res.redirect('/profile/' + req.session.userId);

    usersModel
        .getUserById(req.params.userId)
        .then((user) => {
            user.friends = user.friends.map((userId) => String(userId));
            user.sentRequests = user.sentRequests.map((userId) => String(userId));
            user.receivedRequests = user.receivedRequests.map((userId) => String(userId));
            res.render('profile/profile', { user: user });
        })
}