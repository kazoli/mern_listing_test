const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/index");
const { errorTrigger } = require("../middlewares/errorMiddleware");
const { generateJWT } = require("../middlewares/userMiddleware");

/*
  @desc Register a new user
  @route POST /api/users/register
  @access Public
*/
const registerUser = asyncHandler(async (req, res) => {});

/*
  @desc Login a user
  @route POST /api/users/login
  @access Public
*/
const loginUser = asyncHandler(async (req, res) => {
  // check email and password exist and not empty
  if (!req.body.email || !req.body.password) {
    errorTrigger(res, 400, "Missing login data");
  }

  // check user exists and password is valid
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    errorTrigger(res, 400, "Bad login data");
  }
});

/*
  @desc Get user data
  @route GET /api/users/profile
  @access Private
*/
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

/*
  @desc Update user data
  @route PUT /api/users/profile
  @access Private
*/
const updateUser = asyncHandler(async (req, res) => {});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUser,
};
