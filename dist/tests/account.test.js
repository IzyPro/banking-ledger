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
const account_service_1 = require("../services/account.service");
const account_model_1 = __importDefault(require("../models/account.model"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
jest.mock('../models/account.model');
jest.mock('../models/transaction.model');
jest.mock('../utils/currency.utils');
describe('Account Service', () => {
    it('should create an account', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        account_model_1.default.create.mockResolvedValue({ accountNumber: '12345', currency: 'NGN', balance: 0 });
        const account = yield (0, account_service_1.createAccount)('userId', 'NGN');
        expect((_a = account === null || account === void 0 ? void 0 : account.data) === null || _a === void 0 ? void 0 : _a.accountNumber).toBe('12345');
    }));
    it('should get account balance', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        account_model_1.default.findOne.mockResolvedValue({ balance: 1000 });
        const account = yield (0, account_service_1.getAccount)('12345');
        expect((_a = account === null || account === void 0 ? void 0 : account.data) === null || _a === void 0 ? void 0 : _a.balance).toBe(1000);
    }));
    it('should get transaction history', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        account_model_1.default.findOne.mockResolvedValue({ _id: 'accountId' });
        transaction_model_1.default.find.mockResolvedValue([{ amount: 100, type: 'CREDIT' }]);
        const history = yield (0, account_service_1.getTransactionHistory)('12345');
        expect((_a = history === null || history === void 0 ? void 0 : history.data) === null || _a === void 0 ? void 0 : _a.length).toBe(1);
        expect(history === null || history === void 0 ? void 0 : history.data[0].amount).toBe(100);
    }));
});
