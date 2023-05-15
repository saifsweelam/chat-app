const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    avatar: {
        type: String,
        default: '/avatars/default.png'
    },
    sentRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    receivedRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    friends: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            chat: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Chat'
            }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);