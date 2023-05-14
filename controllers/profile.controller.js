const usersModel = require('../models/users.model');


/** @type {import("express").RequestHandler} */
exports.getProfile = async (req, res, next) => {
    try {
        if (!req.params.userId) return res.redirect('/profile/' + req.session.user._id);

        let user = await usersModel.getUserById(req.params.userId);

        user.friends = user.friends.map((userId) => String(userId));
        user.sentRequests = user.sentRequests.map((userId) => String(userId));
        user.receivedRequests = user.receivedRequests.map((userId) => String(userId));

        res.render('profile/profile', { user });
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}