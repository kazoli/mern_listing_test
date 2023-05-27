import React from 'react';

type tProps = {
  label: string;
  children: JSX.Element;
};

const FormBlock: React.FC<tProps> = (props) => {
  return (
    <div className="form-block">
      <label>{props.label}</label>
      {props.children}
    </div>
  );
};

export default FormBlock;
