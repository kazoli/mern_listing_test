import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type tProps = {
  label: string;
  type: string;
  value: string;
  action: (value: string) => void;
  error: string;
  autocomplete?: string;
  placeholder?: string;
};

const FormInput: React.FC<tProps> = (props) => {
  const [type, setType] = useState(props.type);

  return (
    <div className="form-block">
      <label>{props.label}</label>
      <div className="form-element-wrapper">
        <input
          className="form-element"
          type={type}
          value={props.value}
          onChange={(e) => props.action(e.target.value)}
          autoComplete={props.autocomplete}
          placeholder={props.placeholder}
        />
        {/* if the input is password, displays visibility toogle icon */}
        {props.type === 'password' && (
          <span className="icon-wrapper click">
            {type === 'password' ? (
              <AiOutlineEye className="icon" onClick={() => setType('text')} />
            ) : (
              <AiOutlineEyeInvisible className="icon" onClick={() => setType('password')} />
            )}
          </span>
        )}
      </div>
      {props.error && <div className="form-error">{props.error}</div>}
    </div>
  );
};

export default FormInput;
