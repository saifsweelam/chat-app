const mongoose = require('mongoose');
const Message = require('./messages.schema');

const chatSchema = new mongoose.Schema({
    name: String,
    avatar: {
        type: String,
        default: '/avatars/group.png'
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

chatSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chat'
})

module.exports = mongoose.model('Chat', chatSchema);