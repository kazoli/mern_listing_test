// Type of posted user logint data
export type tUserDataLogin = {
  name: string;
  email: string;
};

// Type of posted user profile data
export type tUserDataSave = tUserDataLogin & {
  password: string;
  oldPassword?: string;
};

// Type of full user data
export type tUserData = tUserDataSave & {
  _id: string;
  collection_id: string;
  createdAt: string;
  updatedAt: string;
};

// Type of user state
export type tUserState = {
  status: 'idle' | 'loading' | 'warning' | 'failed';
  data: {} | tUserData;
};
