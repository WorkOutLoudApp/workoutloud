"use strict";
exports.__esModule = true;
function errorHandler(err, req, res, next) {
    console.error(err);
    next(err);
    return res.status(500).send('Internal Error');
}
exports["default"] = errorHandler;
