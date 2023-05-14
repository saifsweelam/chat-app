const usersModel = require('../models/users.model');


/** @type {import("express").RequestHandler} */
exports.addFriend = async (req, res, next) => {
    try {
        await usersModel.createFriendRequest(req.session.user._id, req.body.userId);
        req.flash("success", "Friend Request Sent");
        res.redirect('/profile/' + req.body.userId);
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}


/** @type {import("express").RequestHandler} */
exports.acceptFriendRequest = async (req, res, next) => {
    try {
        await usersModel.deleteFriendRequest(req.body.userId, req.session.user._id);
        await usersModel.createFriendship(req.body.userId, req.session.user._id);
        req.flash("success", "You are now friends");
        res.redirect('/profile/' + req.body.userId);
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}


/** @type {import("express").RequestHandler} */
exports.declineFriendRequest = async (req, res, next) => {
    try {
        await usersModel.deleteFriendRequest(req.body.userId, req.session.user._id);
        req.flash("success", "Friend Request Declined");
        res.redirect('/profile/' + req.body.userId);
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}


/** @type {import("express").RequestHandler} */
exports.cancelFriendRequest = async (req, res, next) => {
    try {
        await usersModel.deleteFriendRequest(req.session.user._id, req.body.userId);
        req.flash("success", "Friend Request Cancelled");
        res.redirect('/profile/' + req.body.userId);
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}


/** @type {import("express").RequestHandler} */
exports.removeFriend = async (req, res, next) => {
    try {
        await usersModel.deleteFriendship(req.session.user._id, req.body.userId);
        req.flash("success", "You are no longer friends");
        res.redirect('/profile/' + req.body.userId);
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}