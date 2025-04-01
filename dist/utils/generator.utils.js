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
exports.generateUniqueAccountNumber = void 0;
const account_model_1 = __importDefault(require("../models/account.model"));
const generateUniqueAccountNumber = () => __awaiter(void 0, void 0, void 0, function* () {
    let accountNumber = "";
    let isUnique = false;
    while (!isUnique) {
        accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const existingAccount = yield account_model_1.default.findOne({ accountNumber });
        if (!existingAccount)
            isUnique = true;
    }
    return accountNumber;
});
exports.generateUniqueAccountNumber = generateUniqueAccountNumber;
