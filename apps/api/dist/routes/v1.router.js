'use strict';
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
exports.__esModule = true;
var web_1 = __importDefault(require('./web\\index'));
var body_parser_1 = __importDefault(require('body-parser'));
var cors_config_1 = require('..\\utils\\config\\cors.config');
var cors_1 = __importDefault(require('cors'));
var express_1 = require('express');
var router = (0, express_1.Router)();
var dev = process.env.NODE_ENV !== 'production';
// Middlewares
router.use((0, cors_1['default'])({
    origin: dev ? cors_config_1.devOrigins : '',
    credentials: true
}));
router.use(body_parser_1['default'].json());
router.use(body_parser_1['default'].urlencoded({ extended: true }));
// Routes
router.use('/web', web_1['default']);
exports['default'] = router;