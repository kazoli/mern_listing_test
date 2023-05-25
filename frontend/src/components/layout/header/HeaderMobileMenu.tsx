import { BsMenuUp, BsMenuDown } from 'react-icons/bs';

type tProps = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderMobileMenu: React.FC<tProps> = (props) => {
  return (
    <div className="header-menu-element mobile" onClick={() => props.setShowMenu(!props.showMenu)}>
      {props.showMenu ? <BsMenuDown className="icon" /> : <BsMenuUp className="icon" />}
      <span>Menu</span>
    </div>
  );
};

export default HeaderMobileMenu;
