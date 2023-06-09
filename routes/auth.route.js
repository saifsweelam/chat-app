const router = require('express').Router();
const multer = require('multer');

const config = require('../config');
const authorization = require('../authorization');

const authCtrl = require('../controllers/auth.controller');
const authValidators = require('../validators/auth.validators');
const requireValidation = require('../validators/require.validators');

router.use('/login', authorization.requiresNoAuth);

router.get('/login', authCtrl.getLogin);
router.post('/login', ...authValidators.login, requireValidation, authCtrl.postLogin);

router.use('/signup', authorization.requiresNoAuth);

router.get('/signup', authCtrl.getSignup);
router.post('/signup', multer({ storage: config.upload.storage }).single('avatar'), ...authValidators.signup, requireValidation, authCtrl.postSignup);

router.all('/logout', authCtrl.logout);

module.exports = router;
