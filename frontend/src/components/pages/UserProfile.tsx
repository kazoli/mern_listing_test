import { useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const UserProfile = () => {
  useEffect(() => {
    // set page title
    document.title = 'My profile';
  }, []);

  return (
    <DefaultLayout loading={true}>
      <></>
    </DefaultLayout>
  );
};

export default UserProfile;
