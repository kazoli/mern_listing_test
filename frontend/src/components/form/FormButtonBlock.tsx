import { tButton } from '../../app/general/types';

type tProps = {
  buttons: tButton[];
};

const FormButtonBlock: React.FC<tProps> = (props) => {
  return (
    <div className="from-button-wrapper">
      {props.buttons.map((button) => (
        <button key={button.text} className="form-button click" onClick={button.action}>
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default FormButtonBlock;
