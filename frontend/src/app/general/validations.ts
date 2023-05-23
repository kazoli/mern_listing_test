import validator from 'validator';
import { toast } from 'react-toastify';
import { tValidation } from './vaildationTypes';

// Validate an input
export const validateText = async (
  element: string,
  value: string,
  minLength: number,
  maxLength: number,
) => {
  if (!value) {
    return `${element} cannot be empty or missing`;
  }
  if (!value.match(/[A-Za-z0-9]/gi)) {
    return `${element} needs to contain at least one number or letter without accents`;
  }
  if (value.length < minLength) {
    return `${element} needs to be at least ${minLength} characters long`;
  }
  if (value.length > maxLength) {
    return `${element} can be ${maxLength} characters long`;
  }
  return false;
};

// Validate an email
export const validateEmail = async (element: string, value: string) => {
  return validator.isEmail(value) ? false : `${element} needs to be valid format`;
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
    ? false
    : `${element} needs to be between ${minLength} and ${maxLength} characters long and contains at least a lower and upper case letter, a number and a special character`;
};

// Validate a boolean
export const validateBoolean = (element: string, value: string) => {
  return validator.isBoolean(String(value), { loose: false })
    ? false
    : `${element} needs to be boolean value`;
};

export const processName = (value: string, params: tValidation['name']) => {
  //remove starting and trailing spaces
  value = value.trim();
  if (!value.match(/[a-z0-9]/gi)) {
    toast.error('Name field needs to contain one number or letter without accents', {
      toastId: 'name-letter',
    });
    return false;
  } else if (value.length < params.minLength || value.length > params.maxLength) {
    toast.error(
      `Name field length needs to be between ${params.minLength} and ${params.maxLength} characters`,
      {
        toastId: 'name-length',
      },
    );
    return false;
  }
  return true;
};

export const processTags = (values: string[], params: tValidation['tag']) => {
  if (values.length > params.maxNumber) {
    toast.error(`Maximum ${params.maxNumber} tags can be added`, {
      toastId: 'tag-max-number',
    });
    return false;
  }
  let tagError = false;
  values.map((tag) => {
    tag = tag.trim();
    if (tag.length < params.minLength || tag.length > params.maxLength) tagError = true;
    return tag;
  });
  if (tagError) {
    toast.error(
      `All tags need to be between ${params.minLength} and ${params.maxLength} characters length`,
      {
        toastId: 'tag-length',
      },
    );
    return false;
  }
  return true;
};
