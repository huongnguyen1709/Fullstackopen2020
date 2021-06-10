import blogService from '../services/blogs';
import loginService from '../services/login';

import { setNotification } from './notificationReducer';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_LOGGED_IN_USER':
      return { ...action.user };
    case 'LOGIN':
      return { ...action.user };
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({
        type: 'INIT_LOGGED_IN_USER',
        user,
      });
    }
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    let user = await loginService.login(credentials);

    if (user) {
      blogService.setToken(user.token);
      const userId = await blogService.getUserId();
      user = {
        ...user,
        id: userId,
      };
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      dispatch({
        type: 'LOGIN',
        user,
      });
    } else {
      const notification = {
        message: 'Wrong username or password',
        error: true,
      };
      dispatch(setNotification(notification, 5));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export default reducer;
