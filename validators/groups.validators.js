const { check } = require('express-validator');
const usersModel = require('../models/users.model');

exports.createGroup = [
    check('name')
        .notEmpty().withMessage('Chat name is required'),
    check('users')
        .notEmpty().withMessage('You have to add at least 1 group member')
        .bail()
        .custom(async (value, {req}) => {
            let user = await usersModel.getUserById(req.session.user._id);
            let friendIds = user.friends.map((friend) => String(friend.user));
            if (!value.every((user) => friendIds.includes(user))) {
                throw new Error('You are trying to add users who are not your friends');
            }
            return true;
        })
];