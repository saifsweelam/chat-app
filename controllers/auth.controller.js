const usersModel = require('../models/users.model');


/** @type {import("express").RequestHandler} */
exports.getLogin = (req, res, next) => {
    res.render('auth/login');
}


/** @type {import("express").RequestHandler} */
exports.postLogin = async (req, res, next) => {
    try {
        let user = await usersModel.getUserByEmail(req.body.email);
        if (!user) throw new Error('This user doesn\'t exist');
        await usersModel.validatePassword(user, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('/login');
    }
}


/** @type {import("express").RequestHandler} */
exports.getSignup = (req, res, next) => {
    res.render('auth/signup');
}


/** @type {import("express").RequestHandler} */
exports.postSignup = async (req, res, next) => {
    let avatar = req.file ? `/avatars/${req.file.filename}` : undefined;
    try {
        let user = await usersModel.getUserByEmail(req.body.email);
        if (user) throw new Error('This user already exists');
        await usersModel.createUser(req.body.username, req.body.email, req.body.password, avatar);
        req.flash('success', 'User was created successfully')
        res.redirect('/login');
    } catch (err) {
        req.flash('error', err.toString());
        res.redirect('/signup');
    }
}


/** @type {import("express").RequestHandler} */
exports.logout = ({ session }, res, next) => {
    session.destroy(() => {
        res.redirect('/');
    })
}