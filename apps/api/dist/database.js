"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.dbPool = void 0;
var express_1 = __importDefault(require("express"));
var Pool = require('pg').Pool;
var app = (0, express_1["default"])();
var dbPool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'workoutloud',
    database: 'workoutloud'
});
exports.dbPool = dbPool;
