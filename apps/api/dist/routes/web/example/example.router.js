"use strict";
exports.__esModule = true;
var express_1 = require("express");
var example_controller_1 = require("@src/controllers/example.controller");
var router = (0, express_1.Router)({ mergeParams: true });
router.use('/hello', example_controller_1.getExample);
exports["default"] = router;
