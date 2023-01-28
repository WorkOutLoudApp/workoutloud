'use strict';
exports.__esModule = true;
var express_1 = require('express');
var example_controller_1 = require('../../../controllers/example.controller');
var auth_controller_1 = require('../../../controllers/auth.controller');
var users_controller_1 = require('../../../controllers/users.controller');
var router = (0, express_1.Router)({ mergeParams: true });
router.use('/hello', example_controller_1.getExample);
router.use('/auth', auth_controller_1.getAuth);
router.use('/users', users_controller_1.getUsers);
// router.use('/auth', getUsers)
exports['default'] = router;