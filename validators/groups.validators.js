const { check } = require('express-validator');

exports.createGroup = [
    check('name')
        .notEmpty().withMessage('Chat name is required'),
];