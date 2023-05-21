import HeaderUserProfile from './HeaderUserProfile';

type tProps = {
  hideMenu: string;
};

const HeaderMenu = (props: tProps) => {
  return (
    <div className="header-menu-wrapper">
      <HeaderUserProfile hideMenu={props.hideMenu} />
    </div>
  );
};

export default HeaderMenu;
