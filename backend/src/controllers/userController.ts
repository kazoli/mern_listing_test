import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { User, Collection, Task } from '../models/index';
import { errorTrigger } from '../middlewares/errorMiddleware';
import {
  userSetJwtCookie,
  userHashPassword,
  userProfileValidation,
} from '../middlewares/userMiddleware';
import { tDeleteUser, tGetUser, tLoginUser, tRegisterUser, tUpdateUser } from '../types/userTypes';

/*
  @desc Register a new user
  @route POST /api/users/register
  @access Public
*/
export const registerUser: tRegisterUser = asyncHandler(async (req, res) => {
  // validate data
  req.body = userProfileValidation(req.body, res, false);

  // check if user exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    errorTrigger(res, 405, 'User already exists');
  }

  // get hashed password
  const hashedPassword = await userHashPassword(req.body.password);

  //create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  if (user) {
    user.password = '';
    // set a new JWT cookie
    userSetJwtCookie(user.id, res);
    res.status(201).json({
      _id: user.id,
      name: user.name,
      password: '',
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    errorTrigger(res, 400, 'User cannot be created');
  }
});

/*
  @desc Login a user
  @route POST /api/users/login
  @access Public
*/
export const loginUser: tLoginUser = asyncHandler(async (req, res) => {
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
    userSetJwtCookie(user.id, res);
    res.status(200).json({
      _id: user.id,
      name: user.name,
      password: '',
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
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
export const getUser: tGetUser = asyncHandler(async (req, res) => {
  // override password
  res.locals.user.password = '';
  res.status(200).json(res.locals.user);
});

/*
  @desc Update user data
  @route PUT /api/users/profile
  @access Private
*/
export const updateUser: tUpdateUser = asyncHandler(async (req, res) => {
  // validate data
  req.body = userProfileValidation(req.body, res, true);

  let fields = {};
  if (req.body.email !== res.locals.user.email || req.body.password) {
    // require old password to check
    if (await bcrypt.compare(req.body.oldPassword!, res.locals.user.password)) {
      const password =
        !req.body.password || req.body.password === req.body.oldPassword
          ? res.locals.user.password
          : await userHashPassword(req.body.password);
      fields = {
        name: req.body.name,
        email: req.body.email,
        password: password,
      };
    } else {
      errorTrigger(res, 401, 'Current password is not correct');
    }
  } else {
    // no password checking is required
    fields = {
      name: req.body.name,
    };
  }
  // save new data
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: res.locals.user._id,
    },
    {
      $set: fields,
    },
    {
      new: true,
      upsert: false, // true - creates new if given does not exist
    },
  );
  if (updatedUser) {
    res.status(200).json({
      _id: updatedUser.id,
      name: updatedUser.name,
      password: '',
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } else {
    errorTrigger(res, 401, 'User cannot be found or updated');
  }
});

/*
  @desc Delete a user and all related collections and tasks
  @route DELETE /api/users/profile
  @access Private
*/
export const deleteUser: tDeleteUser = asyncHandler(async (req, res) => {
  // require password for deletion
  if (await bcrypt.compare(req.body.password, res.locals.user.password)) {
    // find the user and if exists, remove that
    const removedUser = await User.findOneAndRemove({
      _id: res.locals.user._id,
    });

    if (removedUser) {
      // find all collection ids related to user
      const collections = await Collection.find({
        user_id: res.locals.user._id,
      }).select('_id');
      const collectionIds = collections.map((collection) => collection._id);

      // delete all collections related to deleted user
      await Collection.deleteMany({ user_id: res.locals.user._id });
      //delete all tasks related to deleted collections
      await Task.deleteMany({ collection_id: { $in: collectionIds } });
    } else {
      errorTrigger(res, 401, 'User cannot be found or deleted');
    }

    // return removed user
    res.status(200).json(res.locals.user);
  } else {
    errorTrigger(res, 401, 'Password is not correct');
  }
});
