/**
 * @param {import("socket.io").Server} io
 */
const handler = (io) => {
    io.on('connection', (socket) => {
        let userId = socket.request.session.user._id.toString();
        handler.onlineUsers[userId] = true;
        socket.join(userId);
    
        socket.on('disconnect', () => {
            handler.onlineUsers[userId] = false;
        })
    })
}
handler.onlineUsers = {};

module.exports = handler;