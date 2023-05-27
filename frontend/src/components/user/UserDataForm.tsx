import { tButton } from '../../app/general/types';
import { tUserDataSave } from '../../app/user/userTypes';
import { userFormLabels, userValidationLimits } from '../../app/user/userInitialStates';
import FormInputBlock from '../form/FormInputBlock';
import FormButtonBlock from '../form/FormButtonBlock';
import UserPasswordBlock from './UserPasswordBlock';

type tProps = {
  formData: tUserDataSave;
  setFormData: React.Dispatch<React.SetStateAction<tUserDataSave>>;
  formErrors: tUserDataSave;
  buttons: tButton[];
};

const UserDataForm: React.FC<tProps> = (props) => {
  return (
    <section>
      <FormInputBlock
        label={userFormLabels.name}
        type="text"
        value={props.formData.name}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, name: value }))}
        error={props.formErrors.name}
        placeholder={`From ${userValidationLimits.minName} to ${userValidationLimits.maxName} letters`}
      />
      <FormInputBlock
        label={userFormLabels.email}
        type="email"
        value={props.formData.email}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, email: value }))}
        error={props.formErrors.email}
        placeholder="Enter a valid email format"
      />
      <UserPasswordBlock
        label={
          props.formData.oldPassword === undefined
            ? userFormLabels.password
            : userFormLabels.newPassword
        }
        password={props.formData.password}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, password: value }))}
        error={props.formErrors.password}
        placeholder={`From ${userValidationLimits.minPassword} to ${userValidationLimits.maxPassword} characters`}
      />
      {props.formData.oldPassword !== undefined && (
        <UserPasswordBlock
          label={userFormLabels.oldPassword}
          password={props.formData.oldPassword}
          action={(value) =>
            props.setFormData((prevState) => ({ ...prevState, oldPassword: value }))
          }
          error={props.formErrors.oldPassword!}
          placeholder="Only when new email or password would be saved"
        />
      )}
      <FormButtonBlock buttons={props.buttons} />
    </section>
  );
};

export default UserDataForm;
