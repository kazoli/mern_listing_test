import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/general/hooks';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import { tUserDataSave } from '../../app/user/userTypes';
import DefaultLayout from '../layout/DefaultLayout';
import UserLoginRegisterHeader from '../user/UserFormHeader';
import UserDataForm from '../user/UserDataForm';
import { userValidateDataForm } from '../../app/user/userMiddlewares';
import { registerUser } from '../../app/user/userThunks';

const UserRegister: React.FC = () => {
  useEffect(() => {
    // set page title
    document.title = 'Register';
  }, []);

  // check user is logged in
  const user = useCheckLoggedIn(false);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<tUserDataSave>({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<tUserDataSave>({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = () => {
    userValidateDataForm(formData, setFormErrors).then((submit) => {
      if (submit) {
        // dispatch(registerUser(formData));
      }
    });
  };
  const buttons = [
    {
      text: 'Register',
      action: onSubmit,
    },
  ];

  return (
    <DefaultLayout loading={user.status === 'loading'}>
      <div className="user-form-wrapper">
        <UserLoginRegisterHeader />
        <UserDataForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          buttons={buttons}
        />
      </div>
    </DefaultLayout>
  );
};

export default UserRegister;
