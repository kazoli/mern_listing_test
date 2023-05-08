import { AiOutlineDownCircle } from 'react-icons/ai';

type tProps = {
  text: string;
};

const DropDownListLabel: React.FC<tProps> = (props) => {
  return (
    <label className="icon-wrapper">
      <AiOutlineDownCircle className="icon" />
      <span>{props.text}</span>
    </label>
  );
};

export default DropDownListLabel;
