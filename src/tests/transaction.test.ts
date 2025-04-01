import { deposit, withdraw, transfer } from '../services/transaction.service';
import Account from '../models/account.model';
import Transaction from '../models/transaction.model';
import { convertCurrency } from '../utils/currency.utils';

jest.mock('../models/account.model');
jest.mock('../models/transaction.model');
jest.mock('../utils/currency.utils');

describe('Account Service', () => {
  it('should deposit money', async () => {
    (Account.findOneAndUpdate as jest.Mock).mockResolvedValue({ balance: 2000 });
    (Transaction.create as jest.Mock).mockResolvedValue({});
    const updatedAccount = await deposit('12345', 1000);
    expect(updatedAccount?.data?.balance).toBe(2000);
  });

  it('should not allow deposit of negative amount', async () => {
    await expect((await deposit('12345', -500)).successful).toBe(false);
  });

  it('should withdraw money', async () => {
    (Account.findOne as jest.Mock).mockResolvedValue({ balance: 2000 });
    (Account.findOneAndUpdate as jest.Mock).mockResolvedValue({ balance: 1000 });
    const updatedAccount = await withdraw('12345', 1000);
    expect(updatedAccount?.data?.balance).toBe(1000);
  });

  it('should not allow withdrawal of more than the balance', async () => {
    (Account.findOne as jest.Mock).mockResolvedValue({ balance: 500 });
    await expect((await withdraw('12345', 1000)).successful).toBe(false);
  });


  it('should not allow withdrawal of negative amount', async () => {
    await expect((await withdraw('12345', -500)).successful).toBe(false);
  });

  it('should transfer money with currency conversion', async () => {
    (Account.findOne as jest.Mock).mockImplementation((query) => {
      if (query.accountNumber === 'NGN123') return { accountNumber: 'NGN123', currency: 'NGN', balance: 10000 };
      if (query.accountNumber === 'USD456') return { accountNumber: 'USD456', currency: 'USD', balance: 0 };
      return null;
    });
    (convertCurrency as jest.Mock).mockReturnValue(10);
    (Account.findOneAndUpdate as jest.Mock).mockResolvedValue({ balance: 9990 });
    (Transaction.create as jest.Mock).mockResolvedValue({});

    const updatedAccount = await transfer('NGN123', 'USD456', 7500);
    expect(updatedAccount?.data?.balance).toBe(9990);
  });

  it('should not allow transfer with an invalid sender account', async () => {
    (Account.findOne as jest.Mock).mockImplementation((query) => {
      if (query.accountNumber === 'USD456') return { accountNumber: 'USD456', currency: 'USD', balance: 0 };
      return null;
    });
    await expect((await transfer('INVALID123', 'USD456', 500)).successful).toBe(false);
  });

  it('should not allow transfer with an invalid receiver account', async () => {
    (Account.findOne as jest.Mock).mockImplementation((query) => {
      if (query.accountNumber === 'NGN123') return { accountNumber: 'NGN123', currency: 'NGN', balance: 10000 };
      return null;
    });
    await expect((await transfer('NGN123', 'INVALID456', 500)).successful).toBe(false);
  });

  it('should not allow transfer of negative amount', async () => {
    await expect((await transfer('NGN123', 'USD456', -100)).successful).toBe(false);
  });
});
