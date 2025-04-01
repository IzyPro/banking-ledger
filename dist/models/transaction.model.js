"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    accountId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Account', required: true },
    type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Transaction', TransactionSchema);
