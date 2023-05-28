import { useState } from 'react';
import { useAppDispatch } from '../../app/general/hooks';
import { deleteUser } from '../../app/user/userThunks';
import { userFormLabels } from '../../app/user/userInitialStates';
import PopUp from '../general/PopUp';
import FormButtonBlock from '../form/FormButtonBlock';
import UserPasswordBlock from './UserPasswordBlock';

type tProps = {
  setDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserDeletePopup: React.FC<tProps> = (props) => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const buttons = [
    {
      text: 'Delete my profile',
      action: () => dispatch(deleteUser(password)),
    },
    {
      text: 'Cancel',
      action: () => props.setDeleteConfirm(false),
    },
  ];

  return (
    <PopUp>
      <div className="form-block text">
        All of your collections and tasks will be deleted as well. Are you sure to continue the
        deletion your profile?
      </div>
      <UserPasswordBlock
        label={userFormLabels.password}
        password={password}
        action={(value) => setPassword(value)}
        placeholder="Enter your password"
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default UserDeletePopup;
