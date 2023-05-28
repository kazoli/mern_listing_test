import { AiOutlineExclamationCircle } from 'react-icons/ai';

type tProps = {
  text: string;
};

const FormWarning: React.FC<tProps> = (props) => {
  return (
    <div className="icon-wrapper warning">
      <AiOutlineExclamationCircle className="icon" />
      <span>{props.text}</span>
    </div>
  );
};

export default FormWarning;
