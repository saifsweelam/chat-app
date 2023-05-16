const mongoose = require('mongoose');
const Message = require('./messages.schema');

const chatSchema = new mongoose.Schema({
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