"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCurrency = exports.EXCHANGE_RATE = void 0;
exports.EXCHANGE_RATE = 750; // Example rate: 1 USD = 750 NGN
const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency)
        return amount;
    return fromCurrency === 'NGN' ? amount / exports.EXCHANGE_RATE : amount * exports.EXCHANGE_RATE;
};
exports.convertCurrency = convertCurrency;
