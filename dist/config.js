"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    PORT: process.env.PORT,
    MongoUsername: (_a = process.env.MONGODB_USERNAME) !== null && _a !== void 0 ? _a : '',
    MongoPassword: (_b = process.env.MONGODB_PASSWORD) !== null && _b !== void 0 ? _b : '',
    MongoDBConnection: (_c = process.env.MONGODB_CONNECTION) !== null && _c !== void 0 ? _c : '',
    JWTSecretKey: (_d = process.env.JWT_SECRET) !== null && _d !== void 0 ? _d : '',
};
