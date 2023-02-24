'use strict';
exports.__esModule = true;
var express_1 = require('express');
var auth_controller_1 = require('../../controllers/auth.controller');
var router = (0, express_1.Router)({ mergeParams: true });
router.use('/auth', auth_controller_1.getAuth);
exports['default'] = router;