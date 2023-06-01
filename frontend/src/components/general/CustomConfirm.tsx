import { tCustomConfirm } from '../../app/general/types';
import FormButtonBlock from '../form/FormButtonBlock';
import PopUp from './PopUp';

type tProps = tCustomConfirm;

const CustomConfirm: React.FC<tProps> = (props) => {
  const buttons = [
    {
      text: 'Continue',
      action: props.continueAction,
    },
    {
      text: 'Cancel',
      action: props.cancelAction,
    },
  ];

  return (
    <PopUp>
      <div className="form-block text">{props.text}</div>
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default CustomConfirm;
