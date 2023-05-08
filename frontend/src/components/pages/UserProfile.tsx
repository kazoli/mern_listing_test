import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import { useCheckJwtExists } from '../../app/user/userHooks';
import DefaultLayout from '../layout/DefaultLayout';

const UserProfile = () => {
  // check JWT exists
  useCheckJwtExists(true);

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
