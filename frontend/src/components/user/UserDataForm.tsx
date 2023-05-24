import { tButtons } from '../../app/general/types';
import { tUserDataSave } from '../../app/user/userTypes';
import { userFormLabels, userValidationLimits } from '../../app/user/userInitialStates';
import FormInput from '../form/FormInput';
import FormButtonBlock from '../form/FormButtonBlock';

type tProps = {
  formData: tUserDataSave;
  setFormData: React.Dispatch<React.SetStateAction<tUserDataSave>>;
  formErrors: tUserDataSave;
  buttons: tButtons;
};

const UserDataForm: React.FC<tProps> = (props) => {
  return (
    <section>
      <FormInput
        label={userFormLabels.name}
        type="text"
        value={props.formData.name}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, name: value }))}
        placeholder={`From ${userValidationLimits.minName} to ${userValidationLimits.maxName} letters`}
        error={props.formErrors.name}
      />
      <FormInput
        label={userFormLabels.email}
        type="email"
        value={props.formData.email}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, email: value }))}
        placeholder="Enter a valid email format"
        error={props.formErrors.email}
      />
      <FormInput
        label={
          props.formData.oldPassword === undefined
            ? userFormLabels.password
            : userFormLabels.newPassword
        }
        type="password"
        value={props.formData.password}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, password: value }))}
        placeholder={`From ${userValidationLimits.minPassword} to ${userValidationLimits.maxPassword} characters`}
        autocomplete="off"
        error={props.formErrors.password}
      />
      {props.formData.oldPassword !== undefined && (
        <FormInput
          label={userFormLabels.oldPassword}
          type="password"
          value={props.formData.oldPassword}
          action={(value) =>
            props.setFormData((prevState) => ({ ...prevState, oldPassword: value }))
          }
          placeholder="Only when new email or password would be saved"
          autocomplete="off"
          error={props.formErrors.oldPassword!}
        />
      )}
      <FormButtonBlock buttons={props.buttons} />
    </section>
  );
};

export default UserDataForm;
