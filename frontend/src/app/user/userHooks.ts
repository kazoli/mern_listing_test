import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from './userThunks';
import { logOutUser } from './userSlice';
import { cookieManager } from '../../app/general/middlewares';
import { useAppDispatch, useAppSelector } from '../general/hooks';

// Check if user logged in and navigate to the right page
export const useCheckLoggedIn = (navigateToLogin: boolean) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const jwt = cookieManager.get('jwt');

  useEffect(() => {
    if (jwt) {
      if (!navigateToLogin) {
        // if user is on login or register page and jwt exists, back to main
        navigate({ pathname: '/', search: '' }, { replace: true });
      } else if (!user.data._id) {
        // if user has not got data, it needs to get them
        dispatch(getUser());
      }
    } else {
      if (navigateToLogin) {
        // if no jwt and needs to navigate to login
        navigate({ pathname: '/users/login', search: '' }, { replace: true });
      } else if (!user.data._id) {
        // if no jwt but has user data, then logs out user
        dispatch(logOutUser());
      }
    }
  }, [jwt, user.data._id, navigateToLogin, dispatch, navigate]);

  return user;
};
