const { check } = require('express-validator');
const usersModel = require('../models/users.model');

exports.checkUserId = check('userId')
    .notEmpty().withMessage('You have to specify the User ID')
    .bail()
    .isMongoId().withMessage('Invalid User ID')
    .bail()
    .custom((value, {req}) => {
        if (value === String(req.session.user._id)) throw new Error('You can\'t perform this operation on yourself')
        return true;
    });

exports.addFriend = check('userId')
    .custom(async (value, {req}) => {
        if (await usersModel.areFriends(req.session.user._id, value)) {
            throw new Error('You are already friends');
        }
        if (await usersModel.requestedFriendship(req.session.user._id, value)) {
            throw new Error('There is a previous request between you');
        }
    })

exports.acceptFriend = check('userId')
    .custom(async (value, {req}) => {
        if (await usersModel.areFriends(req.session.user._id, value)) {
            throw new Error('You are already friends');
        }
        if (!await usersModel.requestedFriendship(value, req.session.user._id, false)) {
            throw new Error('You did not receive a request from this user');
        }
    })