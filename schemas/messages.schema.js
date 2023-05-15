const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: String,
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sentAt: Date
})

module.exports = mongoose.model('Message', messageSchema);