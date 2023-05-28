import { NavLink } from 'react-router-dom';
import { HiOutlineClipboardList } from 'react-icons/hi';

const HeaderLogo: React.FC = () => {
  return (
    <div className="header-logo-wrapper">
      <NavLink to="/" className="header-logo-link">
        <span className="header-logo-text">Task</span>
        <HiOutlineClipboardList className="header-logo-icon" />
        <span className="header-logo-text">Manager</span>
      </NavLink>
    </div>
  );
};

export default HeaderLogo;
