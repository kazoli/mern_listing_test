import validator from 'validator';

// Validate an input
export const validateText = (
  element: string,
  value: string,
  minLength: number,
  maxLength: number,
) => {
  if (!value) {
    return `${element} cannot be empty or missing`;
  }
  if (value.length < minLength) {
    return `${element} needs to be at least ${minLength} characters long`;
  }
  if (value.length > maxLength) {
    return `${element} can be maximum ${maxLength} characters long`;
  }
  return '';
};

// Validate an email
export const validateEmail = (element: string, value: string) => {
  return validator.isEmail(value) ? '' : `${element} needs to be valid format`;
};

// Validate the password is strong enough
export const validatePassword = (
  element: string,
  value: string,
  minLength: number,
  maxLength: number,
) => {
  const result =
    value.length <= maxLength &&
    validator.isStrongPassword(value, {
      minLength: minLength,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    });
  return result
    ? ''
    : `${element} needs to be between ${minLength} and ${maxLength} characters long and contains at least a lower and upper case letter, a number and a special character`;
};

// Validate a boolean
export const validateBoolean = (element: string, value: string) => {
  return validator.isBoolean(String(value), { loose: false })
    ? ''
    : `${element} needs to be boolean value`;
};
