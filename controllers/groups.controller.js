const chatsModel = require('../models/chats.model');
const usersModel = require('../models/users.model');


/** @type {import("express").RequestHandler} */
exports.getGroups = async (req, res, next) => {
    try {
        let groups = await chatsModel.getGroupChatsByUserId(req.session.user._id);
        res.render('groups/groups', { groups });
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}


/** @type {import("express").RequestHandler} */
exports.getNewGroup = async (req, res, next) => {
    try {
        let friends = await usersModel.getFriendsByUserId(req.session.user._id);
        res.render('groups/new', { friends });
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}


/** @type {import("express").RequestHandler} */
exports.postNewGroup = async (req, res, next) => {
    let avatar = req.file ? `/avatars/${req.file.filename}` : undefined;
    try {
        req.body.users.push(String(req.session.user._id));
        await chatsModel.createChat(req.body.users, req.body.name, avatar);
        return res.redirect('/groups');
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}

