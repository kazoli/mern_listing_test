import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/index';
import { errorTrigger } from '../middlewares/errorMiddleware';
import { validateText, validateEmail, validatePassword } from './validationMiddleware';
import {
  tUserAuthentication,
  tUserHashPassword,
  tUserProfileValidation,
  tUserSetJwtCookie,
} from '../types/userTypes';

// Set a JWT cookie for user userAuthentication
export const userSetJwtCookie: tUserSetJwtCookie = (_id, res) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET!, {
    expiresIn: '14d',
  });
  res.cookie('jwt', token, {
    httpOnly: false,
    secure: true,
    sameSite: 'strict',
    maxAge: 1209600000, // 14 day
  });
};

// Hash password
export const userHashPassword: tUserHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Authetntication with JWT
export const userAuthentication: tUserAuthentication = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    errorTrigger(res, 401, 'Cookie jwt is missing');
  }

  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };

  if (decoded) {
    // get user from the token
    const user = await User.findById(decoded._id);
    if (user) {
      userSetJwtCookie(user.id, res);
      res.locals.user = {
        _id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
      };
    } else {
      errorTrigger(res, 401, 'User cannot be found');
    }
  } else {
    errorTrigger(res, 401, 'Invalid token');
  }

  next();
});

// validation of user profile data
export const userProfileValidation: tUserProfileValidation = (values, res, update) => {
  // check values exist
  if (
    values.name === undefined ||
    values.email === undefined ||
    values.password === undefined ||
    (update && values.oldPassword === undefined)
  ) {
    errorTrigger(res, 422, 'Some of user profile data are missing');
  }

  // trim accidental white spaces
  values.name = values.name.trim();
  values.email = values.email.trim();
  values.password = values.password.trim();

  let error: string;
  // validate name field
  error = validateText('Full name', values.name, 3, 200);
  if (error) {
    errorTrigger(res, 422, error);
  }

  // validate email
  error = validateEmail('Email', values.email);
  if (error) {
    errorTrigger(res, 422, error);
  }

  if (update && values.oldPassword) {
    values.oldPassword = values.oldPassword.trim();
  }

  // validate password
  if (!update || (values.password.length && values.password !== values.oldPassword)) {
    error = validatePassword('Password', values.password);
    if (error) {
      errorTrigger(res, 422, error);
    }
  }

  return values;
};
