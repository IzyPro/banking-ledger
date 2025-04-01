import { createAccount, getAccount, getTransactionHistory } from '../services/account.service';
import Account from '../models/account.model';
import Transaction from '../models/transaction.model';

jest.mock('../models/account.model');
jest.mock('../models/transaction.model');
jest.mock('../utils/currency.utils');

describe('Account Service', () => {
  it('should create an account', async () => {
    (Account.create as jest.Mock).mockResolvedValue({ accountNumber: '12345', currency: 'NGN', balance: 0 });
    const account = await createAccount('userId', 'NGN');
    expect(account?.data?.accountNumber).toBe('12345');
  });

  it('should get account balance', async () => {
    (Account.findOne as jest.Mock).mockResolvedValue({ balance: 1000 });
    const account = await getAccount('12345');
    expect(account?.data?.balance).toBe(1000);
  });

  it('should get transaction history', async () => {
    (Account.findOne as jest.Mock).mockResolvedValue({ _id: 'accountId' });
    (Transaction.find as jest.Mock).mockResolvedValue([{ amount: 100, type: 'CREDIT' }]);
    const history = await getTransactionHistory('12345');
    expect(history?.data?.length).toBe(1);
    expect(history?.data[0].amount).toBe(100);
  });
});
