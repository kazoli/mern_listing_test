import React from 'react';

type tProps = {
  type: string;
  value: string;
  action: (value: string) => void;
  error: string;
  autocomplete?: string;
  placeholder?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
};

const FromInputElement: React.FC<tProps> = (props) => {
  return (
    <>
      <div className="form-element-wrapper">
        {props.leftIcon}
        <input
          className="form-element"
          type={props.type}
          value={props.value}
          onChange={(e) => props.action(e.target.value)}
          autoComplete={props.autocomplete}
          placeholder={props.placeholder}
        />
        {props.rightIcon}
      </div>
      {props.error && <div className="form-error">{props.error}</div>}
    </>
  );
};

export default FromInputElement;
