const Chat = require('../schemas/chats.schema');
const connection = require('./connection');

exports.createChat = (users) => {
    let chat = new Chat({ users })
    return connection(() => chat.save());
}

exports.getChatDetailsById = (chatId) => {
    return connection(() => Chat.findById(chatId).populate('users').populate({
        path: 'messages',
        options: { sort: { sentAt: 1 } },
        populate: { path: 'sender' }
    }));
}

