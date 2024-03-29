import { AiOutlineHome } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const HeaderMenuHome: React.FC = () => {
  return (
    <NavLink to="/" className="header-menu-element">
      <AiOutlineHome className="icon" />
      <span>Home</span>
    </NavLink>
  );
};

export default HeaderMenuHome;
