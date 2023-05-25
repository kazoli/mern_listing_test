import { NavLink } from 'react-router-dom';
import { AiOutlineLeftCircle } from 'react-icons/ai';

type tProps = {
  backLabel: string;
  label: string;
};

const ListHeaderTitle: React.FC<tProps> = (props) => {
  return (
    <section className="list-header-title">
      <NavLink to="/" className="icon-wrapper click">
        <AiOutlineLeftCircle className="icon" />
        <span>{props.backLabel}</span>
      </NavLink>
      <label>{props.label}</label>
    </section>
  );
};

export default ListHeaderTitle;
