import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/general/hooks';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import { tUserDataSave } from '../../app/user/userTypes';
import { updateUser } from '../../app/user/userThunks';
import { userValidateProfile } from '../../app/user/userMiddlewares';
import DefaultLayout from '../layout/DefaultLayout';
import UserDataForm from '../user/UserDataForm';
import UserDeletePopup from '../user/UserDeletePopup';

const UserProfile: React.FC = () => {
  useEffect(() => {
    // set page title
    document.title = 'My profile';
  }, []);

  // check user is logged in
  const user = useCheckLoggedIn(true);
  const dispatch = useAppDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
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

  const onSubmit = () => {
    userValidateProfile(user.data, formData, setFormErrors).then((submit) => {
      if (submit) {
        dispatch(updateUser(formData));
      }
    });
  };
  const buttons = [
    {
      text: 'Modify data',
      action: onSubmit,
    },
    {
      text: 'Delete my profile',
      action: () => setDeleteConfirm(true),
    },
  ];

  useEffect(() => {
    if (user.data) {
      setFormData((prevState) => ({
        ...prevState,
        name: user.data.name,
        email: user.data.email,
        password: '',
        oldPassword: '',
      }));
    }
  }, [user.data]);

  return (
    <DefaultLayout loading={user.status === 'loading'}>
      <div className="user-form-wrapper">
        <section className="user-form-header">
          <div className="user-form-header-element highlighted">{`${user.data.name}'s profile`}</div>
        </section>
        <UserDataForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          buttons={buttons}
        />
        {deleteConfirm && <UserDeletePopup setDeleteConfirm={setDeleteConfirm} />}
      </div>
    </DefaultLayout>
  );
};

export default UserProfile;
