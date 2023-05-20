const router = require('express').Router();
const multer = require('multer');

const config = require('../config');
const authorization = require('../authorization');

const groupsCtrl = require('../controllers/groups.controller');

const groupsValidators = require('../validators/groups.validators');
const requireValidation = require('../validators/require.validators');

router.use(authorization.requiresAuth);

router.get('/', groupsCtrl.getGroups);

router.get('/new', groupsCtrl.getNewGroup);
router.post(
    '/new',
    multer({ storage: config.upload.storage }).single('avatar'),
    ...groupsValidators.createGroup,
    requireValidation,
    groupsCtrl.postNewGroup
);

module.exports = router;
