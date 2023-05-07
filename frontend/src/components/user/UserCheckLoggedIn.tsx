import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cookieManager } from '../../app/general/middlewares';

type tProps = {
  navigateToLogin: boolean;
};

const UserCheckLoggedIn = (props: tProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = cookieManager.get('jwt');
    if (props.navigateToLogin) {
      if (!jwt) {
        // if no jwt, navigate to login
        navigate('/users/login');
      }
    } else if (jwt) {
      // if on login or register page and jwt exists, back to main
      navigate('/');
    }
  }, [navigate, props.navigateToLogin]);
};

export default UserCheckLoggedIn;
