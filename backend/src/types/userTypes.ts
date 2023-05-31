import { RequestHandler, Response } from 'express';

// Type for user delete request body
type tUserDeleteRequest = {
  password: string;
};

// Type for user login request body
type tUserLoginRequest = tUserDeleteRequest & {
  email: string;
};

// Type for user register request body
type tUserRegisterRequest = tUserLoginRequest & {
  name: string;
};

// Type for user profile request body
type tUserProfileRequest = tUserRegisterRequest & {
  oldPassword?: string;
};

// Type for user JWT cookie setting middleware function
export type tUserSetJwtCookie = {
  (userId: string, res: Response): void;
};

// Type for user password hashing middleware function
export type tUserHashPassword = {
  (password: string): Promise<string>;
};

// Type for user profile validation middleware function
export type tUserProfileValidation = {
  (values: tUserProfileRequest, res: Response, update: boolean): tUserProfileRequest;
};

// Type for user authentication middleware function
export type tUserAuthentication = RequestHandler<
  {}, // request params
  {}, // response body
  {}, // request body
  {} // request query
>;

// Type for register user controller function
export type tRegisterUser = RequestHandler<
  {}, // request params
  {}, // response body
  tUserRegisterRequest, // request body
  {} // request query
>;

// Type for login user controller function
export type tLoginUser = RequestHandler<
  {}, // request params
  {}, // response body
  tUserLoginRequest, // request body
  {} // request query
>;

// Type for get user controller function
export type tGetUser = RequestHandler<
  {}, // request params
  {}, // response body
  {}, // request body
  {} // request query
>;

// Type for update user controller function
export type tUpdateUser = RequestHandler<
  {}, // request params
  {}, // response body
  tUserProfileRequest, // request body
  {} // request query
>;

// Type for delete user controller function
export type tDeleteUser = RequestHandler<
  {}, // request params
  {}, // response body
  tUserDeleteRequest, // request body
  {} // request query
>;
