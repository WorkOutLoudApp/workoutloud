"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.registerGoogle = exports.registerUser = exports.loginGoogle = exports.loginUser = void 0;
var client_1 = require("@prisma/client");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var createToken = function (id) {
    return jsonwebtoken_1["default"].sign({ id: id }, process.env.SECRET, { expiresIn: '3d' });
};
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, success, user, message, authToken, _a, email, password, account, dbUser, error_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                prisma = new client_1.PrismaClient();
                success = false;
                user = {};
                message = '';
                authToken = '';
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, 8, 10]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.account.findFirst({
                        where: {
                            email: email
                        }
                    })];
            case 2:
                account = _b.sent();
                if (!(account && bcrypt_1["default"].compareSync(password, account.password))) return [3 /*break*/, 6];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            accountId: account.id
                        }
                    })];
            case 4:
                dbUser = _b.sent();
                if (dbUser) {
                    success = true;
                    user = {
                        email: account.email,
                        username: dbUser.username,
                        firstName: dbUser.firstName,
                        lastName: dbUser.lastName,
                        avatar: dbUser.avatar
                    };
                    message = 'Login successful';
                    authToken = createToken(account.id);
                }
                else {
                    message = 'User not found';
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                message = 'Error occured white verifyng user' + error_1;
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 10];
            case 7:
                error_2 = _b.sent();
                message = 'Error occured white verifyng account' + error_2;
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, prisma.$disconnect()];
            case 9:
                _b.sent();
                res.json({ success: success, user: user, message: message, authToken: authToken });
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var loginGoogle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, success, user, message, authToken, token, email, password, account, dbUser, error_3, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new client_1.PrismaClient();
                success = false;
                user = {};
                message = '';
                authToken = '';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, 8, 10]);
                token = req.body.token;
                email = token.email;
                password = token.sub;
                return [4 /*yield*/, prisma.account.findFirst({
                        where: {
                            email: email
                        }
                    })];
            case 2:
                account = _a.sent();
                if (!(account && bcrypt_1["default"].compareSync(password, account.password))) return [3 /*break*/, 6];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            accountId: account.id
                        }
                    })];
            case 4:
                dbUser = _a.sent();
                if (dbUser) {
                    success = true;
                    user = {
                        email: account.email,
                        username: dbUser.username,
                        firstName: dbUser.firstName,
                        lastName: dbUser.lastName,
                        avatar: dbUser.avatar
                    };
                    message = 'Login successful';
                    authToken = createToken(account.id);
                }
                else {
                    message = 'User not found';
                }
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                message = 'Error occured white verifyng user' + error_3;
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 10];
            case 7:
                error_4 = _a.sent();
                message = 'Error occured white verifyng account' + error_4;
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, prisma.$disconnect()];
            case 9:
                _a.sent();
                res.json({ success: success, user: user, message: message, authToken: authToken });
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.loginGoogle = loginGoogle;
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, success, user, message, authToken, _a, firstName_1, lastName_1, username_1, email_1, password, account, hashedPassword, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                prisma = new client_1.PrismaClient();
                success = false;
                user = {};
                message = '';
                authToken = '';
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, 8, 10]);
                _a = req.body, firstName_1 = _a.firstName, lastName_1 = _a.lastName, username_1 = _a.username, email_1 = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.account.findFirst({
                        where: {
                            email: email_1
                        }
                    })];
            case 2:
                account = _b.sent();
                if (!account) return [3 /*break*/, 3];
                message = 'Email already registered';
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, bcrypt_1["default"].hash(password, 10)];
            case 4:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma.account.create({
                        data: {
                            email: email_1,
                            password: hashedPassword
                        }
                    }).then(function (newAccount) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.user.create({
                                        data: {
                                            username: username_1,
                                            firstName: firstName_1,
                                            lastName: lastName_1,
                                            avatar: '',
                                            accountId: newAccount.id
                                        }
                                    }).then(function () {
                                        success = true;
                                        user = {
                                            email: email_1,
                                            username: username_1,
                                            firstName: firstName_1,
                                            lastName: lastName_1,
                                            avatar: ''
                                        };
                                        message = 'Registration successful';
                                        authToken = createToken(newAccount.id);
                                    })["catch"](function (error) {
                                        prisma.account["delete"]({
                                            where: {
                                                email: email_1
                                            }
                                        });
                                        message = 'Registration failed: ' + error;
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })["catch"](function (error) {
                        message = 'Registration failed: ' + error;
                    })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3 /*break*/, 10];
            case 7:
                error_5 = _b.sent();
                message = 'Registration failed: ' + error_5;
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, prisma.$disconnect()];
            case 9:
                _b.sent();
                res.json({ success: success, user: user, message: message, authToken: authToken });
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var registerGoogle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, success, user, message, authToken, token, account, firstName_2, lastName_2, username_2, email_2, password, avatar_1, hashedPassword, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new client_1.PrismaClient();
                success = false;
                user = {};
                message = '';
                authToken = '';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, 8, 10]);
                token = req.body.token;
                return [4 /*yield*/, prisma.account.findFirst({
                        where: {
                            email: token.email
                        }
                    })];
            case 2:
                account = _a.sent();
                if (!account) return [3 /*break*/, 3];
                message = 'Email already registered';
                return [3 /*break*/, 6];
            case 3:
                firstName_2 = token.given_name || '';
                lastName_2 = token.family_name || '';
                username_2 = token.email;
                email_2 = token.email;
                password = token.sub;
                avatar_1 = token.picture;
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 10)];
            case 4:
                hashedPassword = _a.sent();
                return [4 /*yield*/, prisma.account.create({
                        data: {
                            email: email_2,
                            password: hashedPassword
                        }
                    }).then(function (newAccount) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.user.create({
                                        data: {
                                            username: username_2,
                                            firstName: firstName_2,
                                            lastName: lastName_2,
                                            avatar: avatar_1,
                                            accountId: newAccount.id
                                        }
                                    }).then(function () {
                                        success = true;
                                        user = {
                                            email: email_2,
                                            username: username_2,
                                            firstName: firstName_2,
                                            lastName: lastName_2,
                                            avatar: avatar_1
                                        };
                                        message = 'Registration successful';
                                        authToken = createToken(newAccount.id);
                                    })["catch"](function (error) {
                                        prisma.account["delete"]({
                                            where: {
                                                email: email_2
                                            }
                                        });
                                        message = 'Registration failed: ' + error;
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })["catch"](function (error) {
                        message = 'Registration failed: ' + error;
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 10];
            case 7:
                error_6 = _a.sent();
                message = 'Registration failed: ' + error_6;
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, prisma.$disconnect()];
            case 9:
                _a.sent();
                res.json({ success: success, user: user, message: message, authToken: authToken });
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.registerGoogle = registerGoogle;
