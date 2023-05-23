import { tUserState, tUserValidationLimits } from './userTypes';

export const userValidationLimits: tUserValidationLimits = {
  minName: 3,
  maxName: 100,
  minPassword: 6,
  maxPassword: 30,
};

// Initial state of user slice
export const userInitialState: tUserState = {
  status: 'idle',
  data: {},
};
