import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import UserCheckLoggedIn from '../user/UserCheckLoggedIn';
import DefaultLayout from '../layout/DefaultLayout';

type tProps = {
  login: boolean;
};

const UserStart: React.FC<tProps> = (props) => {
  UserCheckLoggedIn({
    navigateToLogin: false,
  });

  useEffect(() => {
    // set page title
    document.title = props.login ? 'Log in' : 'Register';
  }, [props.login]);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [login, setLogin] = useState(props.login);

  return (
    <DefaultLayout loading={user.status === 'loading'}>
      <div>
        <section className="user-start-header">
          <span></span>
          <span></span>
        </section>
        <section className="user-start-form"></section>
      </div>
    </DefaultLayout>
  );
};

export default UserStart;
