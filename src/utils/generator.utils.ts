import Account from '../models/account.model';

export const generateUniqueAccountNumber = async (): Promise<string> => {
  let accountNumber:string = "";
  let isUnique = false;
  while (!isUnique) {
    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const existingAccount = await Account.findOne({ accountNumber });
    if (!existingAccount) isUnique = true;
  }
  return accountNumber;
};