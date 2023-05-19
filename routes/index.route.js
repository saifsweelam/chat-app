const router = require('express').Router();

const usersModel = require('../models/users.model');
const authorization = require('../authorization');

const indexCtrl = require('../controllers/index.controller');

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

router.get('/', authorization.requiresAuth, indexCtrl.getHome);
router.get('/friends', authorization.requiresAuth, indexCtrl.getFriends);

module.exports = router;