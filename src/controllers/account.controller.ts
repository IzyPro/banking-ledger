import { Request, Response } from "express";
import {
  createAccount,
  getAccount,
  getTransactionHistory,
} from "../services/account.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { userId, currency } = req.body;
    const result = await createAccount(userId, currency);
    if (result.successful) res.status(200).json(result);
    else res.status(400).json(result);
  } catch (e) {
    if (typeof e === "string") {
      res.status(500).json({ error: e });
    } else if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
  }
};

export const account = async (req: Request, res: Response) => {
  try {
    const accountNumber = req.query.accountNumber as string;
    const result = await getAccount(accountNumber);
    if (result.successful) res.status(200).json(result);
    else res.status(400).json(result);
  } catch (e) {
    if (typeof e === "string") {
      res.status(500).json({ error: e });
    } else if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
  }
};

export const history = async (req: Request, res: Response) => {
  try {
    const accountNumber = req.query.accountNumber as string;
    const result = await getTransactionHistory(accountNumber);
    if (result.successful) res.status(200).json(result);
    else res.status(400).json(result);
  } catch (e) {
    if (typeof e === "string") {
      res.status(500).json({ error: e });
    } else if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
  }
};
