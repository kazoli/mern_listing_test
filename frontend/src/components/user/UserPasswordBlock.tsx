import { useState } from 'react';
import FormInputBlock from '../form/FormInputBlock';
import IconVisibility from '../general/IconVisibility';

type tProps = {
  label: string;
  password: string;
  action: (value: string) => void;
  error: string;
  placeholder?: string;
};

const UserPasswordBlock: React.FC<tProps> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormInputBlock
      label={props.label}
      type={visible ? 'text' : 'password'}
      value={props.password}
      action={props.action}
      error={props.error}
      placeholder={props.placeholder}
      autocomplete="off"
      rightIcon={<IconVisibility visible={visible} action={() => setVisible(!visible)} />}
    />
  );
};

export default UserPasswordBlock;
