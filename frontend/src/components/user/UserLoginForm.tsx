import { tButtons } from '../../app/general/types';
import { tUserDataLogin } from '../../app/user/userTypes';
import FormInput from '../form/FormInput';
import FormButtonBlock from '../form/FormButtonBlock';

type tProps = {
  formData: tUserDataLogin;
  setFormData: React.Dispatch<React.SetStateAction<tUserDataLogin>>;
  formErrors: tUserDataLogin;
  buttons: tButtons;
};

const UserLoginForm: React.FC<tProps> = (props) => {
  return (
    <section>
      <FormInput
        label="Email"
        type="email"
        value={props.formData.email}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, email: value }))}
        placeholder="Enter your email"
        error={props.formErrors.email}
      />
      <FormInput
        label="Password"
        type="password"
        value={props.formData.password}
        action={(value) => props.setFormData((prevState) => ({ ...prevState, password: value }))}
        placeholder="Enter your password"
        autocomplete="off"
        error={props.formErrors.password}
      />
      <FormButtonBlock buttons={props.buttons} />
    </section>
  );
};

export default UserLoginForm;
