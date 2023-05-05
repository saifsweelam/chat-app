const User = require('../schemas/users.schema');
const connection = require('./connection');

const bcrypt = require('bcrypt');

exports.getUserById = (userId) => {
    return connection(() => User.findById(userId));
}

exports.getUserByEmail = (email) => {
    return connection(() => User.findOne({ email: email }));
}

exports.createUser = (username, email, password, avatar) => {
    return bcrypt.hash(password, 10)
        .then((hashed) => {
            let user = new User({
                username: username,
                email: email,
                password: hashed,
                avatar: avatar
            })
            return connection(() => user.save());
        })
}

exports.validatePassword = (user, password) => {
    return bcrypt.compare(password, user.password)
        .then(same => {
            if (!same) throw new Error('The password entered is incorrect.');
            return user;
        })
}

exports.createFriendRequest = (senderId, receiverId) => {
    return connection(() =>
        User
            .updateOne({ _id: senderId }, { $push: { sentRequests: receiverId } })
            .then(() => User.updateOne({ _id: receiverId }, { $push: { receivedRequests: senderId } }))
    )
}

exports.deleteFriendRequest = (senderId, receiverId) => {
    return connection(() =>
        User
            .updateOne({ _id: senderId }, { $pull: { sentRequests: receiverId } })
            .then(() => User.updateOne({ _id: receiverId }, { $pull: { receivedRequests: senderId } }))
    )
}

exports.createFriendship = (user1, user2) => {
    return connection(() =>
        User
            .updateOne({ _id: user1 }, { $push: { friends: user2 } })
            .then(() => User.updateOne({ _id: user2 }, { $push: { friends: user1 } }))
    )
}

exports.deleteFriendship = (user1, user2) => {
    return connection(() =>
        User
            .updateOne({ _id: user1 }, { $pull: { friends: user2 } })
            .then(() => User.updateOne({ _id: user2 }, { $pull: { friends: user1 } }))
    )
}