import { tUserDataSave } from './userTypes';
import { validateEmail, validateText, validatePassword } from '../general/validations';
import { userValidationLimits } from './userInitialStates';

// User data validation
export const userValidateDataForm = async (
  formData: tUserDataSave,
  setFormErrors: React.Dispatch<React.SetStateAction<tUserDataSave>>,
) => {
  console.log(formData);
  let error: string | false = false;
  error = await validateText(
    'Full name',
    formData.name,
    userValidationLimits.minName,
    userValidationLimits.maxName,
  );
  error = await validateEmail('Email', formData.email);
  error = await validatePassword(
    formData.oldPassword ? 'New password' : 'Password',
    formData.password,
    userValidationLimits.minPassword,
    userValidationLimits.maxPassword,
  );
  const errors = await Promise.all([
    validateText(
      'Full name',
      formData.name,
      userValidationLimits.minName,
      userValidationLimits.maxName,
    ),
    validateEmail('Email', formData.email),
    validatePassword(
      formData.oldPassword ? 'New password' : 'Password',
      formData.password,
      userValidationLimits.minPassword,
      userValidationLimits.maxPassword,
    ),
    formData.oldPassword && validateText('Old password', formData.oldPassword, 0, 1000),
  ]);
  let submit = false;
  console.log(errors);
  return submit;
};
