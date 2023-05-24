const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { User } = require('../models/index');
const { errorTrigger } = require('./errorMiddleware');
const { validateText, validateEmail, validatePassword } = require('./validationMiddleware');

// Set a JWT cookie for user authentication
const setJwtCookie = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
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
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Authetntication with JWT
const authentication = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    errorTrigger(res, 401, 'Cookie jwt is missing');
  }

  let decoded;
  try {
    // verify token
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    errorTrigger(res, 401, 'Invalid token');
  }

  // get user from the token
  req.user = await User.findById(decoded.id);
  if (!req.user) {
    errorTrigger(res, 401, 'User cannot be found');
  }

  // set a new JWT cookie
  setJwtCookie(req.user.id, res);

  next();
});

// validation of user profile data
const userProfileValidation = (values, update, res) => {
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

  let error;
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

  if (update) {
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

module.exports = {
  setJwtCookie,
  hashPassword,
  authentication,
  userProfileValidation,
};
