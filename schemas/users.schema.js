const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    avatar: {
        type: String,
        default: '/avatars/default.png'
    }
});

module.exports = mongoose.model('User', userSchema);