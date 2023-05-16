const router = require('express').Router();

const authorization = require('../authorization');

const chatCtrl = require('../controllers/chat.controller');

router.use(authorization.requiresAuth);

router.get('/:chatId', chatCtrl.getChat);

module.exports = router;
