import { useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const UserStart: React.FC = () => {
  useEffect(() => {
    // set page title
    document.title = 'Log in';
  }, []);

  return (
    <DefaultLayout loading={true}>
      <></>
    </DefaultLayout>
  );
};

export default UserStart;
