'use strict';
exports.__esModule = true;
var express_1 = require('express');
var requireAuth_1 = require('../middlewares/requireAuth');
require('dotenv').config();
var router = (0, express_1.Router)();
router.use(requireAuth_1.requireAuth);
router.get('/', function (req, res) {
    res.send({ message: 'access granted' });
});
exports['default'] = router;