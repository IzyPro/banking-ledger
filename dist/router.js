"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./controllers/auth.controller");
const transaction_controller_1 = require("./controllers/transaction.controller");
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const account_controller_1 = require("./controllers/account.controller");
const routes = (0, express_1.Router)();
// AUTH
const authRouter = (0, express_1.Router)();
authRouter.post('/register', auth_controller_1.register);
authRouter.post('/login', auth_controller_1.login);
// TRANSACTION
const transactionRouter = (0, express_1.Router)();
transactionRouter.post('/transfer', auth_middleware_1.default, transaction_controller_1.transferFunds);
transactionRouter.post('/deposit', auth_middleware_1.default, transaction_controller_1.depositFunds);
transactionRouter.post('/withdraw', auth_middleware_1.default, transaction_controller_1.withdrawFunds);
// ACCOUNT
const accountRouter = (0, express_1.Router)();
accountRouter.get('/balance', auth_middleware_1.default, account_controller_1.account);
accountRouter.post('/create', auth_middleware_1.default, account_controller_1.create);
accountRouter.get('/history', auth_middleware_1.default, account_controller_1.history);
routes.use('/account', accountRouter);
routes.use('/auth', authRouter);
routes.use('/transaction', transactionRouter);
exports.default = routes;
