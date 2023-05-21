import { NavLink } from 'react-router-dom';

const UserLoginRegisterHeader: React.FC = () => {
  const links = [
    {
      to: '/users/login',
      text: 'Log in',
    },
    {
      to: '/users/register',
      text: 'Register',
    },
  ];

  return (
    <section className="user-login-register-header">
      {links.map((link) => (
        <NavLink
          key={link.to}
          className={({ isActive }) =>
            isActive ? 'user-login-register-nav highlighted' : 'user-login-register-nav'
          }
          to={link.to}
        >
          {link.text}
        </NavLink>
      ))}
    </section>
  );
};

export default UserLoginRegisterHeader;
