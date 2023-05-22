const { request } = require('express');
const usersModel = require('../models/users.model');


/**
 * @param {import("socket.io").Server} io
 */
const handler = (io) => {
    io.on('connection', async (socket) => {
        let userId = socket.request.session.user._id.toString();
        handler.onlineUsers[userId] = true;
        socket.join(userId);

        let user = socket.request.session.user;
        for (let friend of user.friends) {
            io.to(String(friend.user)).emit('friendOnline', {
                userId: userId,
                username: user.username,
                avatar: user.avatar,
                chat: friend.chat
            });
        }

        socket.on('disconnect', () => {
            handler.onlineUsers[userId] = false;

            for (let friend of user.friends) {
                io.to(String(friend.user)).emit('friendOffline', userId);
            }
        })
    })
}
handler.onlineUsers = {};

module.exports = handler;