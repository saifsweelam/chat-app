const router = require('express').Router();

const authorization = require('../authorization');

const friendsCtrl = require('../controllers/friends.controller');
const friendsValidators = require('../validators/friends.validators');
const requireValidation = require('../validators/require.validators');

router.use(authorization.requiresAuth, friendsValidators.checkUserId);

router.post('/add', friendsValidators.addFriend, requireValidation, friendsCtrl.addFriend);
router.post('/accept', friendsValidators.acceptFriend, requireValidation, friendsCtrl.acceptFriendRequest);
router.post('/decline', requireValidation, friendsCtrl.declineFriendRequest);
router.post('/cancel', requireValidation, friendsCtrl.cancelFriendRequest);
router.post('/unfriend', requireValidation, friendsCtrl.removeFriend);

module.exports = router;
