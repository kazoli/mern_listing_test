import { AiOutlineExclamationCircle } from 'react-icons/ai';

type tProps = {
  text: string;
};

const ListBodyEmpty: React.FC<tProps> = (props) => {
  return (
    <section className="list-empty-container">
      <AiOutlineExclamationCircle className="icon" />
      <span>{props.text}</span>
    </section>
  );
};

export default ListBodyEmpty;
