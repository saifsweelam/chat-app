const { check } = require('express-validator');

module.exports = [
    check('userId')
        .notEmpty().withMessage('You have to specify the User ID')
        .bail()
        .isMongoId().withMessage('Invalid User ID')
        .bail()
        .custom((value, {req}) => {
            if (value === String(req.session.user._id)) throw new Error('You can\'t perform this operation on yourself')
            return true;
        })
];