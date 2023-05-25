import { useState } from 'react';
import HeaderMobileMenu from './HeaderMobileMenu';
import HeaderHome from './HeaderHome';
import HeaderUserProfile from './HeaderUserProfile';

type tProps = {
  hideMenu: string;
};

const HeaderMenu: React.FC<tProps> = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <HeaderMobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className={`header-menu-wrapper ${showMenu ? 'visible' : ''}`}>
        <HeaderHome />
        <HeaderUserProfile hideMenu={props.hideMenu} />
        <HeaderMobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </>
  );
};

export default HeaderMenu;
