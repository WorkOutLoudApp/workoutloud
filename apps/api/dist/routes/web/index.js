'use strict';
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
exports.__esModule = true;
var express_1 = require('express');
var example_router_1 = __importDefault(require('./example/example.router'));
var router = (0, express_1.Router)({ mergeParams: true });
router.use('/example/', example_router_1['default']);
exports['default'] = router;