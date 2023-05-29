import { tButton } from '../../app/general/types';

type tProps = tButton;

const ButtonIcon: React.FC<tProps> = (props) => {
  return (
    <button className="icon-wrapper click" onClick={props.action}>
      {props.icon}
      {props.text && <span>{props.text}</span>}
    </button>
  );
};

export default ButtonIcon;
