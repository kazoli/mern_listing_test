// Type of full user data validation limits
export type tUserFormLabels = {
  name: string;
  email: string;
  password: string;
  newPassword: string;
  oldPassword: string;
};

// Type of full user data validation limits
export type tUserValidationLimits = {
  minName: number;
  maxName: number;
  minPassword: number;
  maxPassword: number;
};

// Type of posted user logint data
export type tUserDataLogin = {
  email: string;
  password: string;
};

// Type of posted user profile data
export type tUserDataSave = tUserDataLogin & {
  name: string;
  oldPassword?: string;
};

// Type of full user data
export type tUserData = tUserDataSave & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

// Type of user state
export type tUserState = {
  status: 'idle' | 'loading' | 'failed';
  data: tUserData;
};
