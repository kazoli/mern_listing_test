import { tUserFormLabels, tUserState, tUserValidationLimits } from './userTypes';

// Form label names to user forms and validations
export const userFormLabels: tUserFormLabels = {
  name: 'Full name',
  email: 'Email',
  password: 'Password',
  newPassword: 'New password',
  oldPassword: 'Current password',
};

// Validation limits for user fields
export const userValidationLimits: tUserValidationLimits = {
  minName: 3,
  maxName: 100,
  minPassword: 6,
  maxPassword: 30,
};

// Initial state of user slice
export const userInitialState: tUserState = {
  status: 'idle',
  data: {
    _id: '',
    name: '',
    email: '',
    password: '',
    createdAt: '',
    updatedAt: '',
  },
};
