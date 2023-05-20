const messagesModel = require('../models/messages.model');
const socketValidators = require('../validators/socket.validators');


/**
 * @param {import("socket.io").Server} io
 */
module.exports = (io) => {
    io.on('connection', (socket) => {
        if (socket.request.session.currentChat) {
            socket.join(String(socket.request.session.currentChat));
        }

        socket.on('sendMessage', async (content, callback) => {
            try {
                socketValidators.newMessage(socket.request.session.currentChat, content);

                let message = await messagesModel.createMessage(content, socket.request.session.user._id, socket.request.session.currentChat);
                io.to(String(socket.request.session.currentChat)).emit('newMessage', message);
                callback();
            } catch (e) {
                socket.emit('error', e.toString());
            }
        })
    })
}