"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.dbClient = void 0;
var express_1 = __importDefault(require("express"));
var Client = require('pg').Client;
var app = (0, express_1["default"])();
var dbClient = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'workoutloud',
    database: 'workoutloud'
});
exports.dbClient = dbClient;
dbClient.connect();
app.get('/', function (req, res) {
    dbClient.query('SELECT * FROM users', function (err, result) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(result.rows);
        }
        dbClient.end();
    });
});
