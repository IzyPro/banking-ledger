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
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const response_model_1 = require("../models/response.model");
const constants_1 = require("../utils/constants");
const registerUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var response = new response_model_1.ResponseModel();
    try {
        const user = new user_model_1.default({ email, password });
        yield user.save();
        user.password = "******";
        response.successful = true;
        response.message = "User registration successful";
        response.data = user;
        return response;
    }
    catch (error) {
        response.message = constants_1.GENERIC_ERROR;
        return response;
    }
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var response = new response_model_1.ResponseModel();
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user || !(yield user.comparePassword(password))) {
            throw new Error('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        response.successful = true;
        response.message = "User registration successful";
        response.data = { token };
        return response;
    }
    catch (error) {
        response.message = constants_1.GENERIC_ERROR;
        return response;
    }
});
exports.loginUser = loginUser;
