const usersModel = require('../models/users.model');
const socketValidators = require('../validators/socket.validators');


/**
 * @param {import("socket.io").Server} io
 */
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('addFriend', async userId => {
            try {
                await socketValidators.addFriend();
                await usersModel.createFriendRequest(socket.request.session.user._id, userId);
                io.to(userId).emit('receivedFriendRequest', socket.request.session.user._id, socket.request.session.user.username);
                socket.emit('sentFriendRequest', userId);
            } catch (e) {
                socket.emit('error', 'Couldn\'t send request');
            }
        });

        socket.on('cancelFriendRequest', async userId => {
            try {
                await usersModel.deleteFriendRequest(socket.request.session.user._id, userId);
                io.to(userId).emit('cancelledFriendRequest', socket.request.session.user._id);
                socket.emit('cancelledFriendRequest', userId);
            } catch (e) {
                socket.emit('error', 'Couldn\'t cancel request');
            }
        })
    })
}