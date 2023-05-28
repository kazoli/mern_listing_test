import { tUserData, tUserDataLogin, tUserDataSave } from './userTypes';
import { validateEmail, validateText, validatePassword } from '../general/validations';
import { userFormLabels, userValidationLimits } from './userInitialStates';

// User register validation
export const userValidateRegister = (
  formData: tUserDataSave,
  setFormErrors: React.Dispatch<React.SetStateAction<tUserDataSave>>,
) => {
  const name = validateText(
    userFormLabels.name,
    formData.name,
    userValidationLimits.minName,
    userValidationLimits.maxName,
  );
  const email = validateEmail(userFormLabels.email, formData.email);
  const password = validatePassword(
    userFormLabels.password,
    formData.password,
    userValidationLimits.minPassword,
    userValidationLimits.maxPassword,
  );
  setFormErrors({
    name,
    email,
    password,
  });
  return !name && !email && !password;
};

// User login validation
export const userValidateLogin = (
  formData: tUserDataLogin,
  setFormErrors: React.Dispatch<React.SetStateAction<tUserDataLogin>>,
) => {
  const email = validateEmail(userFormLabels.email, formData.email);
  // just only check out password is not empty, validity check in backend
  const password = validateText(userFormLabels.password, formData.password, 0, 1000);
  setFormErrors({
    email,
    password,
  });
  return !email && !password;
};

// User register validation
export const userValidateProfile = (
  userData: tUserData,
  formData: tUserDataSave,
  setFormErrors: React.Dispatch<React.SetStateAction<tUserDataSave>>,
) => {
  if (userData.name !== formData.name || userData.email !== formData.email || formData.password) {
    const name = validateText(
      userFormLabels.name,
      formData.name,
      userValidationLimits.minName,
      userValidationLimits.maxName,
    );
    const email = validateEmail(userFormLabels.email, formData.email);
    const password = formData.password
      ? validatePassword(
          userFormLabels.password,
          formData.password,
          userValidationLimits.minPassword,
          userValidationLimits.maxPassword,
        )
      : '';
    const oldPassword =
      userData.email !== formData.email || formData.password
        ? validateText(userFormLabels.oldPassword, formData.oldPassword!, 0, 1000)
        : '';
    setFormErrors({
      name,
      email,
      password,
      oldPassword,
    });
    return !name && !email && !password && !oldPassword;
  } else {
    setFormErrors({
      name: '',
      email: '',
      password: '',
      oldPassword: '',
    });
    return false;
  }
};
