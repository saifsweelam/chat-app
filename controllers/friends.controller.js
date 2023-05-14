const usersModel = require('../models/users.model');

/** @type {import("express").RequestHandler} */
exports.addFriend = (req, res, next) => {
    usersModel
        .createFriendRequest(req.session.user._id, req.body.userId)
        .then(() => {
            req.flash("success", "Friend Request Sent");
            res.redirect('/profile/' + req.body.userId);
        })
        .catch((e) => {
            // Later
        })
}

/** @type {import("express").RequestHandler} */
exports.acceptFriendRequest = (req, res, next) => {
    usersModel
        .deleteFriendRequest(req.body.userId, req.session.user._id)
        .then(() => usersModel.createFriendship(req.body.userId, req.session.user._id))
        .then(() => {
            req.flash("success", "You are now friends");
            res.redirect('/profile/' + req.body.userId);
        })
        .catch((e) => {
            // Later
        })
}

/** @type {import("express").RequestHandler} */
exports.declineFriendRequest = (req, res, next) => {
    usersModel
        .deleteFriendRequest(req.body.userId, req.session.user._id)
        .then(() => {
            req.flash("success", "Friend Request Declined");
            res.redirect('/profile/' + req.body.userId);
        })
        .catch((e) => {
            // Later
        })
}

/** @type {import("express").RequestHandler} */
exports.cancelFriendRequest = (req, res, next) => {
    usersModel
        .deleteFriendRequest(req.session.user._id, req.body.userId)
        .then(() => {
            req.flash("success", "Friend Request Cancelled");
            res.redirect('/profile/' + req.body.userId);
        })
        .catch((e) => {
            // Later
        })
}

/** @type {import("express").RequestHandler} */
exports.removeFriend = (req, res, next) => {
    usersModel
        .deleteFriendship(req.session.user._id, req.body.userId)
        .then(() => {
            req.flash("success", "You are no longer friends");
            res.redirect('/profile/' + req.body.userId);
        })
        .catch((e) => {
            // Later
        })
}