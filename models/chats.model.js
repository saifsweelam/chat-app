const Chat = require('../schemas/chats.schema');
const connection = require('./connection');

exports.createChat = (users) => {
    let chat = new Chat({ users })
    return connection(() => chat.save());
}

exports.getChatDetailsById = (chatId) => {
    return connection(() => Chat.findById(chatId).populate(['users', 'messages']));
}

