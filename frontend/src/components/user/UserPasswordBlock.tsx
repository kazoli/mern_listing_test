import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import FormInputBlock from '../form/FormInputBlock';
import ButtonIconCircle from '../general/ButtonIconCircle';

type tProps = {
  label: string;
  password: string;
  action: (value: string) => void;
  error?: string;
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
      rightIcon={
        <ButtonIconCircle
          action={() => setVisible(!visible)}
          icon={
            visible ? <AiOutlineEye className="icon" /> : <AiOutlineEyeInvisible className="icon" />
          }
        />
      }
    />
  );
};

export default UserPasswordBlock;
