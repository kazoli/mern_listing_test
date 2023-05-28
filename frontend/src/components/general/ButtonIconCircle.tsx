import { tButton } from '../../app/general/types';

type tProps = tButton;

const ButtonIconCircle: React.FC<tProps> = (props) => {
  return (
    <button className="icon-wrapper circle click" onClick={props.action}>
      {props.icon}
    </button>
  );
};

export default ButtonIconCircle;
