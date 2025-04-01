import { Request, Response } from "express";
import { deposit, transfer, withdraw } from "../services/transaction.service";

export const transferFunds = async (req: Request, res: Response) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;
    const result = await transfer(fromAccount, toAccount, amount);
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

export const depositFunds = async (req: Request, res: Response) => {
  try {
    const { accountNumber, amount } = req.body;
    const result = await deposit(accountNumber, amount);
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

export const withdrawFunds = async (req: Request, res: Response) => {
  try {
    const { accountNumber, amount } = req.body;
    const result = await withdraw(accountNumber, amount);
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
