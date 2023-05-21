import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/general/hooks';
import { logOutUser } from '../../../app/user/userSlice';
import { BsPerson } from 'react-icons/bs';
import DropDownMenu from '../../general/DropDownMenu';

type tProps = {
  hideMenu: string;
};

const HeaderUserProfile = (props: tProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const userLogIn = {
    '/users/login': 'Log in',
    '/users/register': 'Register',
  };
  const userLogOut = {
    logout: 'Log out',
    '/users/profile': 'My profile',
  };

  const action = (value: string) => {
    if (value === 'logout') {
      dispatch(logOutUser());
    } else {
      navigate(value);
    }
  };

  return (
    <DropDownMenu
      wrapperClass="header-drop-down-wrapper"
      listClass={`${props.hideMenu} header-drop-down-list`}
      optionClass="icon-wrapper click"
      trigger={
        <button className="header-menu-list-trigger">
          <BsPerson />
        </button>
      }
      options={Object.keys(user.data).length ? userLogOut : userLogIn}
      action={action}
    />
  );
};

export default HeaderUserProfile;
