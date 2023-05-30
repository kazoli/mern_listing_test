import { RequestHandler, Response } from 'express';

// Type for user data in DB
type tUserData = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

// Type for user delete request body
type tUserDeleteRequest = {
  password: tUserData['password'];
};

// Type for user login request body
type tUserLoginRequest = tUserDeleteRequest & {
  email: tUserData['name'];
};

// Type for user register request body
type tUserRegisterRequest = tUserLoginRequest & {
  name: tUserData['name'];
};

// Type for user profile request body
type tUserProfileRequest = tUserRegisterRequest & {
  oldPassword?: string;
};

// Type for user JWT cookie setting function
export type tUserSetJwtCookie = {
  (userId: tUserData['_id'], res: Response): void;
};

// Type for user JWT cookie setting function
export type tUserHashPassword = {
  (password: tUserData['password']): Promise<string>;
};

// Type for user profile validation function
export type tUserProfileValidation = {
  (values: tUserProfileRequest, res: Response, update: boolean): tUserProfileRequest;
};

// Type for user authentication function
export type tUserAuthentication = RequestHandler<
  {}, // request params
  {}, // response body
  {}, // request body
  {} // request query
>;

// Type for register user controller function
export type tRegisterUser = RequestHandler<
  {}, // request params
  tUserData, // response body
  tUserRegisterRequest, // request body
  {} // request query
>;

// Type for login user controller function
export type tLoginUser = RequestHandler<
  {}, // request params
  tUserData, // response body
  tUserLoginRequest, // request body
  {} // request query
>;

// Type for get user controller function
export type tGetUser = RequestHandler<
  {}, // request params
  tUserData, // response body
  {}, // request body
  {} // request query
>;

// Type for update user controller function
export type tUpdateUser = RequestHandler<
  {}, // request params
  tUserData, // response body
  tUserProfileRequest, // request body
  {} // request query
>;

// Type for delete user controller function
export type tDeleteUser = RequestHandler<
  {}, // request params
  tUserData, // response body
  tUserDeleteRequest, // request body
  {} // request query
>;
