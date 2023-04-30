const router = require('express').Router();

const authorization = require('../authorization');

const profileCtrl = require('../controllers/profile.controller');

router.use(authorization.requiresAuth);

router.get('/', profileCtrl.getProfile);
router.get('/:userId', profileCtrl.getProfile);

module.exports = router;
