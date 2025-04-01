import Account from "../models/account.model";
import { ResponseModel } from "../models/response.model";
import Transaction from "../models/transaction.model";
import { GENERIC_ERROR } from "../utils/constants";

export const createAccount = async (userId: string, currency: string) => {
  var response = new ResponseModel();
  try {
    var account = await Account.create({ userId, currency });
    if (!account) {
      response.message = "Failed to create account";
      return response;
    }

    response.message = "Account created successfully";
    response.data = account;
    response.successful = true;
    return response;
  } catch (error) {
    response.message = GENERIC_ERROR;
    return response;
  }
};

export const getAccount = async (accountNumber: string) => {
  var response = new ResponseModel();
  try {
    const account = await Account.findOne({ accountNumber: accountNumber });
    if (!account) {
      response.message = "Failed to retrieve account";
      return response;
    }

    response.message = "Account retrieved successfully";
    response.data = account;
    response.successful = true;
    return response;
  } catch (error) {
    response.message = GENERIC_ERROR;
    return response;
  }
};

export const getTransactionHistory = async (accountNumber: string) => {
  var response = new ResponseModel();
  try {
    const account = await Account.findOne({ accountNumber: accountNumber });
    if (!account) {
      response.message = "Failed to retrieve account";
      return response;
    }
    var transactions = await Transaction.find({ accountId: account?._id });

    response.message = "Transactions retrieved successfully";
    response.data = transactions;
    response.successful = true;
    return response;
  } catch (error) {
    response.message = GENERIC_ERROR;
    return response;
  }
};
