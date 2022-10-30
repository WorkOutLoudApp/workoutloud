'use strict';
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
exports.__esModule = true;
var middlewares_1 = require('./middlewares\\index');
var v1_router_1 = __importDefault(require('./routes\\v1.router'));
var express_1 = __importDefault(require('express'));
var helmet_1 = __importDefault(require('helmet'));
var morgan_1 = __importDefault(require('morgan'));
var app = (0, express_1['default'])();
var port = process.env.PORT || 4000;
var dev = process.env.NODE_ENV !== 'production';
// Middlewares
app.use((0, helmet_1['default'])());
if (dev)
    app.use((0, morgan_1['default'])('dev'));
// Routes
app.use('/v1', v1_router_1['default']);
// Error Handling
app.use(function (req, res) {
    res.status(404).send('Not Found');
});
app.use(middlewares_1.errorHandler);
app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log('Listening on port '.concat(port));
});