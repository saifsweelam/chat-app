const User = require('../schemas/users.schema');
const connection = require('./connection');

const bcrypt = require('bcrypt');

exports.getUserByEmail = (email) => {
    return connection(() => User.findOne({ email: email }));
}

exports.createUser = (username, email, password, avatar) => {
    return bcrypt.hash(password, 10)
    .then((hashed) => {
        let user = new User({
            username: username,
            email: email,
            password: hashed,
            avatar: avatar
        })
        return connection(() => user.save());
    })
}

exports.validatePassword = (user, password) => {
    return bcrypt.compare(password, user.password)
    .then(same => {
        if (!same) throw new Error('The password entered is incorrect.');
        return user;
    })
}