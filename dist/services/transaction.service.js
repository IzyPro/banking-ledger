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
exports.transfer = exports.withdraw = exports.deposit = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const account_model_1 = __importDefault(require("../models/account.model"));
const currency_utils_1 = require("../utils/currency.utils");
const response_model_1 = require("../models/response.model");
const constants_1 = require("../utils/constants");
const mongoose_1 = __importDefault(require("mongoose"));
const deposit = (accountNumber, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new response_model_1.ResponseModel();
    try {
        if (amount < 1) {
            response.message = "Invalid amount";
            return response;
        }
        const account = yield account_model_1.default.findOneAndUpdate({ accountNumber }, { $inc: { balance: amount } }, { new: true });
        var transaction = yield transaction_model_1.default.create({
            accountId: account === null || account === void 0 ? void 0 : account._id,
            type: "CREDIT",
            amount,
        });
        response.data = account;
        response.successful = true;
        response.message = "Deposit successful";
        return response;
    }
    catch (error) {
        response.message = constants_1.GENERIC_ERROR;
        return response;
    }
});
exports.deposit = deposit;
const withdraw = (accountNumber, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new response_model_1.ResponseModel();
    try {
        if (amount < 1) {
            response.message = "Invalid amount";
            return response;
        }
        var account = yield account_model_1.default.findOne({ accountNumber });
        if ((account === null || account === void 0 ? void 0 : account.balance) < amount) {
            response.message = "insufficient funds";
            return response;
        }
        account = yield account_model_1.default.findOneAndUpdate({ accountNumber }, { $inc: { balance: -amount } }, { new: true });
        var transaction = yield transaction_model_1.default.create({
            accountId: account === null || account === void 0 ? void 0 : account._id,
            type: "DEBIT",
            amount,
        });
        response.data = account;
        response.successful = true;
        response.message = "Withdrawal successful";
        return response;
    }
    catch (error) {
        response.message = constants_1.GENERIC_ERROR;
        return response;
    }
});
exports.withdraw = withdraw;
const transfer = (fromAccountNumber, toAccountNumber, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new response_model_1.ResponseModel();
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // console.log(fromAccountNumber);
        // fromAccountNumber = fromAccountNumber.trim();
        // toAccountNumber = toAccountNumber.trim();
        if (fromAccountNumber === toAccountNumber) {
            response.message = "Source and destination accounts are the same";
            return response;
        }
        const fromAccount = yield account_model_1.default.findOne({
            accountNumber: fromAccountNumber,
        }).session(session);
        const toAccount = yield account_model_1.default.findOne({
            accountNumber: toAccountNumber,
        }).session(session);
        if (!fromAccount || !toAccount) {
            response.message = "Invalid Account Number";
            return response;
        }
        if (amount < 1) {
            response.message = "Invalid amount";
            return response;
        }
        if ((fromAccount === null || fromAccount === void 0 ? void 0 : fromAccount.balance) < amount) {
            response.message = "insufficient funds";
            return response;
        }
        const convertedAmount = (0, currency_utils_1.convertCurrency)(amount, fromAccount.currency, toAccount.currency);
        fromAccount.balance -= amount;
        toAccount.balance += convertedAmount;
        yield fromAccount.save({ session });
        yield toAccount.save({ session });
        yield transaction_model_1.default.insertMany([
            { type: "DEBIT", amount: amount, accountId: fromAccount.id },
            { type: "CREDIT", amount: convertedAmount, accountId: toAccount.id },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        response.successful = true;
        response.message = "Transfer successful";
        return response;
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        session.endSession();
        response.message = constants_1.GENERIC_ERROR;
        return response;
    }
});
exports.transfer = transfer;
