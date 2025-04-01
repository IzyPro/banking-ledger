import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await registerUser(email, password);
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
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