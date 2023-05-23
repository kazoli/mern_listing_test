import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/general/hooks';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import DefaultLayout from '../layout/DefaultLayout';
import { tUserDataSave } from '../../app/user/userTypes';
import UserDataForm from '../user/UserDataForm';

const UserProfile = () => {
  useEffect(() => {
    // set page title
    document.title = 'My profile';
  }, []);

  // check user is logged in
  const user = useCheckLoggedIn(true);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<tUserDataSave>({
    name: '',
    email: '',
    password: '',
    oldPassword: '',
  });
  const [formErrors, setFormErrors] = useState<tUserDataSave>({
    name: '',
    email: '',
    password: '',
    oldPassword: '',
  });

  const onSubmit = () => {};
  const buttons = [
    {
      text: 'Modify data',
      action: onSubmit,
    },
  ];

  return (
    <DefaultLayout loading={user.status === 'loading'}>
      <div className="user-form-wrapper">
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

export default UserProfile;
