const router = require('express').Router();

const authorization = require('../authorization');

const friendsCtrl = require('../controllers/friends.controller');
const friendsValidators = require('../validators/friends.validators');
const requireValidation = require('../validators/require.validators');

router.use(authorization.requiresAuth, ...friendsValidators, requireValidation);

router.post('/add', friendsCtrl.addFriend);
router.post('/accept', friendsCtrl.acceptFriendRequest);
router.post('/decline', friendsCtrl.declineFriendRequest);
router.post('/cancel', friendsCtrl.cancelFriendRequest);
router.post('/unfriend', friendsCtrl.removeFriend);

module.exports = router;
