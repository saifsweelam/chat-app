const router = require('express').Router();
const multer = require('multer');

const config = require('../config');

const authCtrl = require('../controllers/auth.controller');
const authValidators = require('../validators/auth.validators');

router.get('/login', authCtrl.getLogin);
router.post('/login', ...authValidators.login, authCtrl.postLogin);

router.get('/signup', authCtrl.getSignup);
router.post('/signup', multer({ storage: config.upload.storage }).single('avatar'), ...authValidators.signup, authCtrl.postSignup);

router.all('/logout', authCtrl.logout);

module.exports = router;
