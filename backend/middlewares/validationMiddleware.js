const validator = require("validator");

// general input validation
const validateInput = (value, minLength, maxLength) => {
  if (!value) {
    return "Name field cannot be empty or missed";
  }
  if (!value.match(/[a-z0-9]/gi)) {
    return "Name field needs to contain one number or letter without accents";
  }
  if (value.length < minLength) {
    return `Name field needs to be at least ${minLength} characters long`;
  }
  if (value.length > maxLength) {
    return `Name field can be ${maxLength} characters long`;
  }
  return false;
};

// validate a boolean
const validateBoolean = (name, value) => {
  return validator.isBoolean(String(value), { loose: false })
    ? false
    : `${name} needs to be a boolean value`;
};

module.exports = {
  validateInput,
  validateBoolean,
};
