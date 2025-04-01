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
Object.defineProperty(exports, "__esModule", { value: true });
exports.history = exports.account = exports.create = void 0;
const account_service_1 = require("../services/account.service");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, currency } = req.body;
        const result = yield (0, account_service_1.createAccount)(userId, currency);
        if (result.successful)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    }
    catch (e) {
        if (typeof e === "string") {
            res.status(500).json({ error: e });
        }
        else if (e instanceof Error) {
            res.status(500).json({ error: e.message });
        }
    }
});
exports.create = create;
const account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountNumber = req.query.accountNumber;
        const result = yield (0, account_service_1.getAccount)(accountNumber);
        if (result.successful)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    }
    catch (e) {
        if (typeof e === "string") {
            res.status(500).json({ error: e });
        }
        else if (e instanceof Error) {
            res.status(500).json({ error: e.message });
        }
    }
});
exports.account = account;
const history = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountNumber = req.query.accountNumber;
        const result = yield (0, account_service_1.getTransactionHistory)(accountNumber);
        if (result.successful)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    }
    catch (e) {
        if (typeof e === "string") {
            res.status(500).json({ error: e });
        }
        else if (e instanceof Error) {
            res.status(500).json({ error: e.message });
        }
    }
});
exports.history = history;
