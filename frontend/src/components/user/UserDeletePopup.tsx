import { useState } from 'react';
import { useAppDispatch } from '../../app/general/hooks';
import { deleteUser } from '../../app/user/userThunks';
import PopUp from '../general/PopUp';
import FormButtonBlock from '../form/FormButtonBlock';
import FormInput from '../form/FormInput';
import { userFormLabels } from '../../app/user/userInitialStates';

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
        All your collections and tasks will be deleted as well. Are you sure to continue the
        deletion your profile?
      </div>
      <FormInput
        label={userFormLabels.password}
        type="password"
        value={password}
        action={(value) => setPassword(value)}
        placeholder="Enter your password"
        autocomplete="off"
        error=""
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default UserDeletePopup;
