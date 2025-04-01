export const EXCHANGE_RATE = 750; // Example rate: 1 USD = 750 NGN

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  if (fromCurrency === toCurrency) return amount;
  return fromCurrency === 'NGN' ? amount / EXCHANGE_RATE : amount * EXCHANGE_RATE;
};