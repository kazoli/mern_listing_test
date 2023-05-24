import { tUserData, tUserDataLogin, tUserDataSave } from './userTypes';
import { validateEmail, validateText, validatePassword } from '../general/validations';
import { userFormLabels, userValidationLimits } from './userInitialStates';

// User register validation
export const userValidateRegister = async (
  formData: tUserDataSave,
  setFormErrors: React.Dispatch<React.SetStateAction<tUserDataSave>>,
) => {
  const name = await validateText(
    userFormLabels.name,
    formData.name,
    userValidationLimits.minName,
    userValidationLimits.maxName,
  );
  const email = await validateEmail(userFormLabels.email, formData.email);
  const password = await validatePassword(
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
export const userValidateLogin = async (
  formData: tUserDataLogin,
  setFormErrors: React.Dispatch<React.SetStateAction<tUserDataLogin>>,
) => {
  const email = await validateEmail(userFormLabels.email, formData.email);
  // just only check out password is not empty, validity check in backend
  const password = await validateText(userFormLabels.password, formData.password, 0, 1000);
  setFormErrors({
    email,
    password,
  });
  return !email && !password;
};

// User register validation
export const userValidateProfile = async (
  userData: tUserData,
  formData: tUserDataSave,
  setFormErrors: React.Dispatch<React.SetStateAction<tUserDataSave>>,
) => {
  if (userData.name !== formData.name || userData.email !== formData.email || formData.password) {
    const name = await validateText(
      userFormLabels.name,
      formData.name,
      userValidationLimits.minName,
      userValidationLimits.maxName,
    );
    const email = await validateEmail(userFormLabels.email, formData.email);
    const password = formData.password
      ? await validatePassword(
          userFormLabels.password,
          formData.password,
          userValidationLimits.minPassword,
          userValidationLimits.maxPassword,
        )
      : '';
    const oldPassword =
      userData.email !== formData.email || formData.password
        ? await validateText(userFormLabels.oldPassword, formData.oldPassword!, 0, 1000)
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
