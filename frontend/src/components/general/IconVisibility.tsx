import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type tProps = {
  visible: boolean;
  action: () => void;
};

const IconVisibility: React.FC<tProps> = (props) => {
  return (
    <span className="icon-wrapper click">
      {props.visible ? (
        <AiOutlineEye className="icon" onClick={props.action} />
      ) : (
        <AiOutlineEyeInvisible className="icon" onClick={props.action} />
      )}
    </span>
  );
};

export default IconVisibility;
