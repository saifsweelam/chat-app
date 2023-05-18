const User = require('../schemas/users.schema');
const connection = require('./connection');

const bcrypt = require('bcrypt');

exports.getUserById = (userId) => connection(() => User.findById(userId));

exports.getUserByEmail = (email) => connection(() => User.findOne({ email: email }));

exports.createUser = async (username, email, password, avatar) => {
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        avatar: avatar
    })
    return await connection(() => user.save());
}

exports.validatePassword = async (user, password) => {
    let same = await bcrypt.compare(password, user.password);
    if (!same) throw new Error('The password entered is incorrect.');
    return user;
}

exports.getReceivedRequestsByUserId = (userId) => {
    return connection(async () => {
        let user = await User.findById(userId, { receivedRequests: true }).populate('receivedRequests');
        return user.receivedRequests;
    });
}

exports.getFriendsByUserId = (userId) => {
    return connection(async () => {
        let user = await User.findById(userId, { friends: true }).populate('friends.user');
        return user.friends;
    });
}

exports.createFriendRequest = (senderId, receiverId) => {
    return connection(() => 
        Promise.all([
            User.updateOne({ _id: senderId }, { $push: { sentRequests: receiverId } }),
            User.updateOne({ _id: receiverId }, { $push: { receivedRequests: senderId } })
        ])
    )
}

exports.deleteFriendRequest = (senderId, receiverId) => {
    return connection(() =>
        Promise.all([
            User.updateOne({ _id: senderId }, { $pull: { sentRequests: receiverId } }),
            User.updateOne({ _id: receiverId }, { $pull: { receivedRequests: senderId } })
        ])
    )
}

exports.createFriendship = (user1, user2, chatId) => {
    return connection(() => 
        Promise.all([
            User.updateOne({ _id: user1 }, { $push: { friends: { chat: chatId, user: user2 } } }),
            User.updateOne({ _id: user2 }, { $push: { friends: { chat: chatId, user: user1 } } })
        ])
    )
}

exports.deleteFriendship = (user1, user2) => {
    return connection(() =>
        Promise.all([
            User.updateOne({ _id: user1 }, { $pull: { friends: { user: user2 } } }),
            User.updateOne({ _id: user2 }, { $pull: { friends: { user: user1 } } })
        ])
    )
}