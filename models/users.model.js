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

exports.createFriendRequest = (senderId, receiverId) => {
    return connection(async () => {
        await User.updateOne({ _id: senderId }, { $push: { sentRequests: receiverId } });
        return await User.updateOne({ _id: receiverId }, { $push: { receivedRequests: senderId } });
    })
}

exports.deleteFriendRequest = (senderId, receiverId) => {
    return connection(async () => {
        await User.updateOne({ _id: senderId }, { $pull: { sentRequests: receiverId } });
        return await User.updateOne({ _id: receiverId }, { $pull: { receivedRequests: senderId } })
    })
}

exports.createFriendship = (user1, user2) => {
    return connection(async () => {
        await User.updateOne({ _id: user1 }, { $push: { friends: user2 } });
        return await User.updateOne({ _id: user2 }, { $push: { friends: user1 } });
    })
}

exports.deleteFriendship = (user1, user2) => {
    return connection(async () => {
        await User.updateOne({ _id: user1 }, { $pull: { friends: user2 } });
        return await User.updateOne({ _id: user2 }, { $pull: { friends: user1 } });
    })
}