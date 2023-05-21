import { useEffect } from 'react';
import { useAppDispatch } from '../../app/general/hooks';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import DefaultLayout from '../layout/DefaultLayout';
import UserLoginRegisterHeader from '../user/UserLoginRegisterHeader';

const UserLogin: React.FC = () => {
  // check user is logged in
  const user = useCheckLoggedIn(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // set page title
    document.title = 'Log in';
  }, []);

  return (
    <DefaultLayout loading={user.status === 'loading'}>
      <div className="user-login-register-wrapper">
        <UserLoginRegisterHeader />
      </div>
    </DefaultLayout>
  );
};

export default UserLogin;
