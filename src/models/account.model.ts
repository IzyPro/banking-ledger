import mongoose from 'mongoose';
import { generateUniqueAccountNumber } from '../utils/generator.utils';

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountNumber: { type: String, unique: true, required: true },
  currency: { type: String, enum: ['NGN', 'USD'], required: true },
  balance: { type: Number, default: 0 },
});

AccountSchema.pre('validate', async function (next) {
  if (!this.accountNumber) {
    this.accountNumber = await generateUniqueAccountNumber();
  }
  next();
});

export default mongoose.model('Account', AccountSchema);