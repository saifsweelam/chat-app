const usersModel = require('../models/users.model');

exports.newMessage = (currentChat, content) => {
    if (!currentChat) throw new Error("There is no registered current chat");
    if (!content) throw new Error("You can't send an empty message");
    return true;
}

exports.addFriend = async (senderId, receiverId) => {
    if (String(senderId) === String(receiverId)) throw new Error('You cannot add yourself');
    if (await usersModel.areFriends(senderId, receiverId)) throw new Error('You are already friends');
    if (await usersModel.requestedFriendship(senderId, receiverId)) throw new Error('There is a previous request between you');
    return true;
}