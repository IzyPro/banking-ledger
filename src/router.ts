import {Router} from 'express';
import { login, register } from './controllers/auth.controller';
import { depositFunds, transferFunds, withdrawFunds } from './controllers/transaction.controller';
import authenticate from './middlewares/auth.middleware';
import { account, create, history } from './controllers/account.controller';

const routes = Router();

// AUTH
const authRouter = Router();
authRouter.post('/register', register);
authRouter.post('/login', login);

// TRANSACTION
const transactionRouter = Router();
transactionRouter.post('/transfer', authenticate, transferFunds);
transactionRouter.post('/deposit', authenticate, depositFunds);
transactionRouter.post('/withdraw', authenticate, withdrawFunds);

// ACCOUNT
const accountRouter = Router();
accountRouter.get('/balance', authenticate, account);
accountRouter.post('/create', authenticate, create);
accountRouter.get('/history', authenticate, history);


routes.use('/account', accountRouter);
routes.use('/auth', authRouter);
routes.use('/transaction', transactionRouter);

export default routes;