import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import UserCheckLoggedIn from '../user/UserCheckLoggedIn';
import DefaultLayout from '../layout/DefaultLayout';

const UserProfile = () => {
  UserCheckLoggedIn({
    navigateToLogin: true,
  });

  useEffect(() => {
    // set page title
    document.title = 'My profile';
  }, []);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <DefaultLayout loading={user.status === 'loading'}>
      <></>
    </DefaultLayout>
  );
};

export default UserProfile;
