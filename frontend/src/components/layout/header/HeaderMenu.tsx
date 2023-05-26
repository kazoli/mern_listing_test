import { useState } from 'react';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderMenuHome from './HeaderMenuHome';
import HeaderMenuUser from './HeaderMenuUser';

type tProps = {
  hideMenu: string;
};

const HeaderMenu: React.FC<tProps> = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <HeaderMenuMobile showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className={`header-menu-wrapper ${showMenu ? 'visible' : ''}`}>
        <HeaderMenuHome />
        <HeaderMenuUser hideMenu={props.hideMenu} />
        <HeaderMenuMobile showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </>
  );
};

export default HeaderMenu;
