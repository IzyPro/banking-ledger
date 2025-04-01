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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionHistory = exports.getAccount = exports.createAccount = void 0;
const account_model_1 = __importDefault(require("../models/account.model"));
const response_model_1 = require("../models/response.model");
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const constants_1 = require("../utils/constants");
const createAccount = (userId, currency) => __awaiter(void 0, void 0, void 0, function* () {
    var response = new response_model_1.ResponseModel();
    try {
        var account = yield account_model_1.default.create({ userId, currency });
        if (!account) {
            response.message = "Failed to create account";
            return response;
        }
        response.message = "Account created successfully";
        response.data = account;
        response.successful = true;
        return response;
    }
    catch (error) {
        response.message = constants_1.GENERIC_ERROR;
        return response;
    }
});
exports.createAccount = createAccount;
const getAccount = (accountNumber) => __awaiter(void 0, void 0, void 0, function* () {
    var response = new response_model_1.ResponseModel();
    try {
        const account = yield account_model_1.default.findOne({ accountNumber: accountNumber });
        if (!account) {
            response.message = "Failed to retrieve account";
            return response;
        }
        response.message = "Account retrieved successfully";
        response.data = account;
        response.successful = true;
        return response;
    }
    catch (error) {
        response.message = constants_1.GENERIC_ERROR;
        return response;
    }
});
exports.getAccount = getAccount;
const getTransactionHistory = (accountNumber) => __awaiter(void 0, void 0, void 0, function* () {
    var response = new response_model_1.ResponseModel();
    try {
        const account = yield account_model_1.default.findOne({ accountNumber: accountNumber });
        if (!account) {
            response.message = "Failed to retrieve account";
            return response;
        }
        var transactions = yield transaction_model_1.default.find({ accountId: account === null || account === void 0 ? void 0 : account._id });
        response.message = "Transactions retrieved successfully";
        response.data = transactions;
        response.successful = true;
        return response;
    }
    catch (error) {
        response.message = constants_1.GENERIC_ERROR;
        return response;
    }
});
exports.getTransactionHistory = getTransactionHistory;
