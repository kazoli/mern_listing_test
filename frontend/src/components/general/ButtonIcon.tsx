import { AiOutlinePlusCircle } from 'react-icons/ai';
import { tButton } from '../../app/general/types';

type tProps = tButton;

const ButtonIcon: React.FC<tProps> = (props) => {
  return (
    <button className="icon-wrapper click" onClick={props.action}>
      <AiOutlinePlusCircle className="icon" />
      <span>{props.text}</span>
    </button>
  );
};

export default ButtonIcon;
