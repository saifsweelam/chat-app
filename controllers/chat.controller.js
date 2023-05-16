const chatsModel = require('../models/chats.model');


/** @type {import("express").RequestHandler} */
exports.getChat = async (req, res, next) => {
    try {
        let chat = await chatsModel.getChatDetailsById(req.params.chatId);
        chat.user = chat.users.find(user => String(user._id) != String(req.session.user._id));
        req.session.currentChat = req.params.chatId;
        res.render('chat/chat', { chat });
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('back');
    }
}