'use strict';
exports.__esModule = true;
var express_1 = require('express');
var userController_1 = require('../../controllers/userController');
var router = (0, express_1.Router)({ mergeParams: true });
router.post('/login', userController_1.loginUser);
router.post('/register', userController_1.registerUser);
module.exports = router;