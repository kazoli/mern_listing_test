import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/general/hooks';
import { logOutUser } from '../../../app/user/userSlice';
import { collectionReset } from '../../../app/collection/collectionSlice';
import { taskReset } from '../../../app/task/taskSlice';
import { BsPerson } from 'react-icons/bs';
import DropDownMenu from '../../general/DropDownMenu';

type tProps = {
  hideMenu: string;
};

const HeaderMenuUser: React.FC<tProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const userLogIn = {
    '/users/login': 'Log in',
    '/users/register': 'Register',
  };
  const userLogOut = {
    '/users/profile': 'My profile',
    logout: 'Log out',
  };

  const action = (value: string) => {
    if (value === 'logout') {
      dispatch(logOutUser());
      dispatch(collectionReset());
      dispatch(taskReset());
    } else {
      navigate(value);
    }
  };

  return (
    <DropDownMenu
      wrapperClass="header-drop-down-wrapper"
      listClass={`${props.hideMenu} header-drop-down-list right-end`}
      optionClass="icon-wrapper click"
      trigger={
        <button className="header-menu-element">
          <BsPerson className="icon" />
          <span>Me</span>
        </button>
      }
      options={user.data._id ? userLogOut : userLogIn}
      action={action}
    />
  );
};

export default HeaderMenuUser;
