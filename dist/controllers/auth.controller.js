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
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, auth_service_1.registerUser)(email, password);
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
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, auth_service_1.loginUser)(email, password);
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
exports.login = login;
