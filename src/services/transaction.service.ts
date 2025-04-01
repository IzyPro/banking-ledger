import Transaction from "../models/transaction.model";
import Account from "../models/account.model";
import { convertCurrency } from "../utils/currency.utils";
import { ResponseModel } from "../models/response.model";
import { GENERIC_ERROR } from "../utils/constants";
import mongoose from "mongoose";

export const deposit = async (accountNumber: string, amount: number) => {
  const response = new ResponseModel();
  try {
    if (amount < 1) {
      response.message = "Invalid amount";
      return response;
    }
    const account = await Account.findOneAndUpdate(
      { accountNumber },
      { $inc: { balance: amount } },
      { new: true }
    );
    var transaction = await Transaction.create({
      accountId: account?._id,
      type: "CREDIT",
      amount,
    });
    response.data = account;
    response.successful = true;
    response.message = "Deposit successful";
    return response;
  } catch (error) {
    response.message = GENERIC_ERROR;
    return response;
  }
};

export const withdraw = async (accountNumber: string, amount: number) => {
  const response = new ResponseModel();
  try {
    if (amount < 1) {
      response.message = "Invalid amount";
      return response;
    }
    var account = await Account.findOne({ accountNumber });
    if (account?.balance! < amount) {
      response.message = "insufficient funds";
      return response;
    }

    account = await Account.findOneAndUpdate(
      { accountNumber },
      { $inc: { balance: -amount } },
      { new: true }
    );
    var transaction = await Transaction.create({
      accountId: account?._id,
      type: "DEBIT",
      amount,
    });
    response.data = account;
    response.successful = true;
    response.message = "Withdrawal successful";
    return response;
  } catch (error) {
    response.message = GENERIC_ERROR;
    return response;
  }
};

export const transfer = async (
  fromAccountNumber: string,
  toAccountNumber: string,
  amount: number
) => {
  const response = new ResponseModel();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // console.log(fromAccountNumber);
    // fromAccountNumber = fromAccountNumber.trim();
    // toAccountNumber = toAccountNumber.trim();

    if (fromAccountNumber === toAccountNumber) {
      response.message = "Source and destination accounts are the same";
      return response;
    }
    const fromAccount = await Account.findOne({
      accountNumber: fromAccountNumber,
    }).session(session);
    const toAccount = await Account.findOne({
      accountNumber: toAccountNumber,
    }).session(session);

    if (!fromAccount || !toAccount) {
      response.message = "Invalid Account Number";
      return response;
    }

    if (amount < 1) {
      response.message = "Invalid amount";
      return response;
    }
    if (fromAccount?.balance! < amount) {
      response.message = "insufficient funds";
      return response;
    }

    const convertedAmount = convertCurrency(
      amount,
      fromAccount.currency,
      toAccount.currency
    );
    fromAccount.balance -= amount;
    toAccount.balance += convertedAmount;
    await fromAccount.save({ session });
    await toAccount.save({ session });
    await Transaction.insertMany(
      [
        { type: "DEBIT", amount: amount, accountId: fromAccount.id },
        { type: "CREDIT", amount: convertedAmount, accountId: toAccount.id },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    response.successful = true;
    response.message = "Transfer successful";
    return response;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    response.message = GENERIC_ERROR;
    return response;
  }
};
