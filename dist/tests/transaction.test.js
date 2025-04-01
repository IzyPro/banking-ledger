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
const transaction_service_1 = require("../services/transaction.service");
const account_model_1 = __importDefault(require("../models/account.model"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const currency_utils_1 = require("../utils/currency.utils");
jest.mock('../models/account.model');
jest.mock('../models/transaction.model');
jest.mock('../utils/currency.utils');
describe('Account Service', () => {
    it('should deposit money', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        account_model_1.default.findOneAndUpdate.mockResolvedValue({ balance: 2000 });
        transaction_model_1.default.create.mockResolvedValue({});
        const updatedAccount = yield (0, transaction_service_1.deposit)('12345', 1000);
        expect((_a = updatedAccount === null || updatedAccount === void 0 ? void 0 : updatedAccount.data) === null || _a === void 0 ? void 0 : _a.balance).toBe(2000);
    }));
    it('should not allow deposit of negative amount', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((yield (0, transaction_service_1.deposit)('12345', -500)).successful).toBe(false);
    }));
    it('should withdraw money', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        account_model_1.default.findOne.mockResolvedValue({ balance: 2000 });
        account_model_1.default.findOneAndUpdate.mockResolvedValue({ balance: 1000 });
        const updatedAccount = yield (0, transaction_service_1.withdraw)('12345', 1000);
        expect((_a = updatedAccount === null || updatedAccount === void 0 ? void 0 : updatedAccount.data) === null || _a === void 0 ? void 0 : _a.balance).toBe(1000);
    }));
    it('should not allow withdrawal of more than the balance', () => __awaiter(void 0, void 0, void 0, function* () {
        account_model_1.default.findOne.mockResolvedValue({ balance: 500 });
        yield expect((yield (0, transaction_service_1.withdraw)('12345', 1000)).successful).toBe(false);
    }));
    it('should not allow withdrawal of negative amount', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((yield (0, transaction_service_1.withdraw)('12345', -500)).successful).toBe(false);
    }));
    it('should transfer money with currency conversion', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        account_model_1.default.findOne.mockImplementation((query) => {
            if (query.accountNumber === 'NGN123')
                return { accountNumber: 'NGN123', currency: 'NGN', balance: 10000 };
            if (query.accountNumber === 'USD456')
                return { accountNumber: 'USD456', currency: 'USD', balance: 0 };
            return null;
        });
        currency_utils_1.convertCurrency.mockReturnValue(10);
        account_model_1.default.findOneAndUpdate.mockResolvedValue({ balance: 9990 });
        transaction_model_1.default.create.mockResolvedValue({});
        const updatedAccount = yield (0, transaction_service_1.transfer)('NGN123', 'USD456', 7500);
        expect((_a = updatedAccount === null || updatedAccount === void 0 ? void 0 : updatedAccount.data) === null || _a === void 0 ? void 0 : _a.balance).toBe(9990);
    }));
    it('should not allow transfer with an invalid sender account', () => __awaiter(void 0, void 0, void 0, function* () {
        account_model_1.default.findOne.mockImplementation((query) => {
            if (query.accountNumber === 'USD456')
                return { accountNumber: 'USD456', currency: 'USD', balance: 0 };
            return null;
        });
        yield expect((yield (0, transaction_service_1.transfer)('INVALID123', 'USD456', 500)).successful).toBe(false);
    }));
    it('should not allow transfer with an invalid receiver account', () => __awaiter(void 0, void 0, void 0, function* () {
        account_model_1.default.findOne.mockImplementation((query) => {
            if (query.accountNumber === 'NGN123')
                return { accountNumber: 'NGN123', currency: 'NGN', balance: 10000 };
            return null;
        });
        yield expect((yield (0, transaction_service_1.transfer)('NGN123', 'INVALID456', 500)).successful).toBe(false);
    }));
    it('should not allow transfer of negative amount', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((yield (0, transaction_service_1.transfer)('NGN123', 'USD456', -100)).successful).toBe(false);
    }));
});
