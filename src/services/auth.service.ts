import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { ResponseModel } from '../models/response.model';
import { GENERIC_ERROR } from '../utils/constants';

export const registerUser = async (email: string, password: string) => {
  var response = new ResponseModel();
  try {
  const user = new User({ email, password });
  await user.save();
  user.password = "******";
  response.successful = true;
  response.message = "User registration successful";
  response.data = user;

  return response;
  } catch (error) {
      response.message = GENERIC_ERROR;
      return response;
    }
};

export const loginUser = async (email: string, password: string) => {
    var response = new ResponseModel();
    try {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  response.successful = true;
  response.message = "User registration successful";
  response.data = {token};

  return response;
} catch (error) {
    response.message = GENERIC_ERROR;
    return response;
  }
};