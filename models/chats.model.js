const Chat = require('../schemas/chats.schema');
const connection = require('./connection');

exports.createChat = (users, name, avatar) => {
    let chat = new Chat({ users })
    name && (chat.name = name);
    avatar && (chat.avatar = avatar);
    return connection(() => chat.save());
}

exports.getChatDetailsById = (chatId) => {
    return connection(() => Chat.findById(chatId).populate('users').populate({
        path: 'messages',
        options: { sort: { sentAt: 1 } },
        populate: { path: 'sender' }
    }));
}

exports.getGroupChatsByUserId = (userId) => {
    return connection(() => Chat.find({
        users: userId,
        $where: "this.users.length > 2"
    }))
}
