const Message = require('../schemas/messages.schema');
const connection = require('./connection');

exports.createMessage = (content, senderId, chatId) => {
    let message = new Message({
        content: content,
        sender: senderId,
        chat: chatId,
        sentAt: Date.now()
    })
    return connection(async () => {
        message = await message.save();
        return await message.populate('sender');
    });
}