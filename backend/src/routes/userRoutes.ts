import express from 'express';
import { userAuthentication } from '../middlewares/userMiddleware';
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';

export const userRouter = express.Router();

userRouter.route('/register').post(registerUser);

userRouter.route('/login').post(loginUser);

userRouter
  .route('/profile')
  .get(userAuthentication, getUser)
  .put(userAuthentication, updateUser)
  .delete(userAuthentication, deleteUser);
