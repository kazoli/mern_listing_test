import { tButton } from '../../app/general/types';
import { tUserDataLogin } from '../../app/user/userTypes';
import { userFormLabels } from '../../app/user/userInitialStates';
import FormInputBlock from '../form/FormInputBlock';
import FormButtonBlock from '../form/FormButtonBlock';
import UserPasswordBlock from './UserPasswordBlock';

type tProps = {
  formData: tUserDataLogin;
  setFormData: React.Dispatch<React.SetStateAction<tUserDataLogin>>;
  formErrors: tUserDataLogin;
  buttons: tButton[];
};

const UserLoginForm: React.FC<tProps> = (props) => {
  return (
    <section>
      <FormInputBlock
        label={userFormLabels.email}
        type="email"
        value={props.formData.email}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, email: value }))}
        error={props.formErrors.email}
        placeholder="Enter your email"
      />
      <UserPasswordBlock
        label={userFormLabels.password}
        password={props.formData.password}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, password: value }))}
        error={props.formErrors.password}
        placeholder="Enter your password"
      />
      <FormButtonBlock buttons={props.buttons} />
    </section>
  );
};

export default UserLoginForm;
