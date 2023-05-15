const { onlineUsers } = require('../sockets/online.socket');
const usersModel = require('../models/users.model');

/** @type {import("express").RequestHandler} */
exports.getHome = async (req, res, next) => {
    try {
        let friends = await usersModel.getFriendsByUserId(req.session.user._id);
        friends = friends.filter(friend => onlineUsers[String(friend.user._id)]);
        res.render('home/index', { friends });
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}