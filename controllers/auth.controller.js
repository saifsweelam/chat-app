const usersModel = require('../models/users.model');

/** @type {import("express").RequestHandler} */
exports.getLogin = (req, res, next) => {
    res.render('auth/login');
}

/** @type {import("express").RequestHandler} */
exports.postLogin = (req, res, next) => {
    usersModel
        .getUserByEmail(req.body.email)
        .then(user => {
            if (!user) throw new Error('This user doesn\'t exist');

            return usersModel.validatePassword(user, req.body.password);
        })
        .then(user => {
            req.session.user = user;
            res.redirect('/');
        })
        .catch((err) => {
            req.flash('error', err.toString());
            res.redirect('/login');
        })
}

/** @type {import("express").RequestHandler} */
exports.getSignup = (req, res, next) => {
    res.render('auth/signup');
}

/** @type {import("express").RequestHandler} */
exports.postSignup = (req, res, next) => {
    let avatar = req.file ? `/avatars/${req.file.filename}` : undefined;
    usersModel
        .getUserByEmail(req.body.email)
        .then((user) => {
            if (user) throw new Error('This user already exists');

            return usersModel.createUser(req.body.username, req.body.email, req.body.password, avatar);
        })
        .then(() => {
            req.flash('success', 'User was created successfully')
            res.redirect('/login');
        })
        .catch((err) => {
            req.flash('error', err.toString());
            res.redirect('/signup');
        });
}

/** @type {import("express").RequestHandler} */
exports.logout = ({ session }, res, next) => {
    session.destroy(() => {
        res.redirect('/');
    })
}