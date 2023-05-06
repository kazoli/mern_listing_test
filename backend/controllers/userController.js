const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { User, Collection, Task } = require('../models/index');
const { errorTrigger } = require('../middlewares/errorMiddleware');
const {
  setJwtCookie,
  hashPassword,
  userProfileValidation,
} = require('../middlewares/userMiddleware');

/*
  @desc Register a new user
  @route POST /api/users/register
  @access Public
*/
const registerUser = asyncHandler(async (req, res) => {
  // validate data
  req.body = userProfileValidation(req.body, false, res);

  // check if user exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    errorTrigger(res, 405, 'User already exists');
  }

  // get hashed password
  const hashedPassword = await hashPassword(req.body.password);

  //create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  if (user) {
    // set a new JWT cookie
    setJwtCookie(user.id, res);
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('User cannot be created');
  }
});

/*
  @desc Login a user
  @route POST /api/users/login
  @access Public
*/
const loginUser = asyncHandler(async (req, res) => {
  // check email and password exist and not empty
  if (!req.body.email || !req.body.password) {
    errorTrigger(res, 400, 'Missing login data');
  }

  // trim accidental white spaces
  req.body.email = req.body.email.trim();
  req.body.password = req.body.password.trim();

  // check user exists and password is valid
  const user = await User.findOne({ email: req.body.email });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    // set a new JWT cookie
    setJwtCookie(user.id, res);
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    errorTrigger(res, 401, 'Bad login data');
  }
});

/*
  @desc Get user data
  @route GET /api/users/profile
  @access Private
*/
const getUser = asyncHandler(async (req, res) => {
  // override password
  req.user.password = '';
  res.status(200).json(req.user);
});

/*
  @desc Update user data
  @route PUT /api/users/profile
  @access Private
*/
const updateUser = asyncHandler(async (req, res) => {
  // validate data
  req.body = userProfileValidation(req.body, true, res);

  let fields = {};
  if (req.body.email !== req.user.email || req.body.password !== req.body.oldPassword) {
    // require old password to check
    if (await bcrypt.compare(req.body.oldPassword, req.user.password)) {
      const password =
        !req.body.password || req.body.password === req.body.oldPassword
          ? req.user.password
          : await hashPassword(req.body.password);
      fields = {
        name: req.body.name,
        email: req.body.email,
        password: password,
      };
    } else {
      errorTrigger(res, 401, 'Old password is not correct');
    }
  } else {
    // no password checking is required
    fields = {
      name: req.body.name,
    };
  }
  // save new data
  const user = await User.findOneAndUpdate(
    {
      _id: req.user.id,
    },
    {
      $set: fields,
    },
    {
      new: true,
      upsert: false, // true - creates new if given does not exist
    },
  );
  res.status(200).json({
    _id: req.user._id,
    name: user.name,
    email: user.email,
  });
});

/*
  @desc Delete a user and all related collections and tasks
  @route DELETE /api/users/profile
  @access Private
*/
const deleteUser = asyncHandler(async (req, res) => {
  // require password for deletion
  if (await bcrypt.compare(req.body.password, req.user.password)) {
    // find the user and if exists, remove that
    const user = await User.findOneAndRemove({
      _id: req.user.id,
    });

    if (user) {
      // find all collection ids related to user
      const collections = await Collection.find({
        user_id: req.user.id,
      }).select('_id');
      const collectionIds = collections.map((collection) => collection._id);

      // delete all collections related to deleted user
      await Collection.deleteMany({ user_id: req.user.id });
      //delete all tasks related to deleted collections
      await Task.deleteMany({ collection_id: { $in: collectionIds } });
    } else {
      errorTrigger(res, 401, 'User cannot be deleted');
    }

    // return removed user
    res.status(200).json(user);
  } else {
    errorTrigger(res, 401, 'Password is not correct');
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUser,
  deleteUser,
};
