const validator = require('validator');

// General text validation
const validateText = (element, value, minLength, maxLength) => {
  if (!value) {
    return `${element} cannot be empty or missing`;
  }
  if (value.length < minLength) {
    return `${element} needs to be at least ${minLength} characters long`;
  }
  if (value.length > maxLength) {
    return `${element} can be ${maxLength} characters long`;
  }
  return false;
};

// Validate a boolean
const validateBoolean = (element, value) => {
  return validator.isBoolean(String(value), { loose: false })
    ? false
    : `${element} needs to be boolean value`;
};

// Validate email
const validateEmail = (element, value) => {
  return validator.isEmail(value) ? false : `${element} needs to be valid format`;
};

// Validate the password is strong enough
const validatePassword = (element, value) => {
  const minLength = 6;
  const maxLength = 30;
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
    ? false
    : `${element} needs to be between ${minLength} and ${maxLength} characters long and contains at least a lower and upper case letter, a number and a special character`;
};

module.exports = {
  validateText,
  validateBoolean,
  validateEmail,
  validatePassword,
};
