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
exports.withdrawFunds = exports.depositFunds = exports.transferFunds = void 0;
const transaction_service_1 = require("../services/transaction.service");
const transferFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fromAccount, toAccount, amount } = req.body;
        const result = yield (0, transaction_service_1.transfer)(fromAccount, toAccount, amount);
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
exports.transferFunds = transferFunds;
const depositFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber, amount } = req.body;
        const result = yield (0, transaction_service_1.deposit)(accountNumber, amount);
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
exports.depositFunds = depositFunds;
const withdrawFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber, amount } = req.body;
        const result = yield (0, transaction_service_1.withdraw)(accountNumber, amount);
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
exports.withdrawFunds = withdrawFunds;
