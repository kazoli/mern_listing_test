import { NavLink } from 'react-router-dom';
import { HiOutlineClipboardList } from 'react-icons/hi';

const HeaderLogo: React.FC = () => {
  return (
    <NavLink to="/" className="header-logo-wrapper">
      <span className="header-logo-text">Task</span>
      <HiOutlineClipboardList className="header-logo-icon" />
      <span className="header-logo-text">Manager</span>
    </NavLink>
  );
};

export default HeaderLogo;
