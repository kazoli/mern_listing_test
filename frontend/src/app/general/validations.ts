import { toast } from 'react-toastify';
import { tValidation } from './vaildationTypes';

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
