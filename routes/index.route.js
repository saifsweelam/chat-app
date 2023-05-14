const router = require('express').Router();

const usersModel = require('../models/users.model');

router.use((req, res, next) => {
    if (req.session.user) {
        usersModel
            .getReceivedRequestsByUserId(req.session.user._id)
            .then(requests => {
                res.locals.receivedRequests = requests;
                next();
            })
    } else {
        next()
    }
})

module.exports = router;