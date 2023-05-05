const router = require('express').Router();

const usersModel = require('../models/users.model');

router.use((req, res, next) => {
    if (req.session.userId) {
        usersModel
            .getReceivedRequestsByUserId(req.session.userId)
            .then(requests => {
                res.locals.receivedRequests = requests;
                next();
            })
    } else {
        next()
    }
})

module.exports = router;