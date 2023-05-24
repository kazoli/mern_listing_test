import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/general/hooks';
import { loginUser } from '../../app/user/userThunks';
import { tUserDataLogin } from '../../app/user/userTypes';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import { userValidateLogin } from '../../app/user/userMiddlewares';
import DefaultLayout from '../layout/DefaultLayout';
import UserLoginRegisterHeader from '../user/UserLoginRegisterHeader';
import UserLoginForm from '../user/UserLoginForm';

const UserLogin: React.FC = () => {
  useEffect(() => {
    // set page title
    document.title = 'Log in';
  }, []);

  // check user is logged in
  const user = useCheckLoggedIn(false);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<tUserDataLogin>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<tUserDataLogin>({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    userValidateLogin(formData, setFormErrors).then((submit) => {
      if (submit) {
        dispatch(loginUser(formData));
      }
    });
  };
  const buttons = [
    {
      text: 'Log in',
      action: onSubmit,
    },
  ];

  return (
    <DefaultLayout loading={user.status === 'loading'}>
      <div className="user-form-wrapper">
        <UserLoginRegisterHeader />
        <UserLoginForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          buttons={buttons}
        />
      </div>
    </DefaultLayout>
  );
};

export default UserLogin;
