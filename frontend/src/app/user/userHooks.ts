import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cookieManager } from '../../app/general/middlewares';

// Check if JWT exist and according to it navigate to the right page
export const useCheckJwtExists = (navigateToLogin: boolean) => {
  const navigate = useNavigate();
  const jwt = cookieManager.get('jwt');
  useEffect(() => {
    if (navigateToLogin) {
      if (!jwt) {
        // if no jwt, navigate to login
        navigate('/users/login');
      }
    } else if (jwt) {
      // if on login or register page and jwt exists, back to main
      navigate('/');
    }
  }, [jwt, navigate, navigateToLogin]);
  return jwt;
};
