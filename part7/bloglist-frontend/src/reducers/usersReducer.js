import usersService from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return [...action.users];

    default:
      return state;
  }
};

export const initializeUsersList = () => {
  return async (dispatch) => {
    const users = await usersService.getAllUsers();

    dispatch({
      type: 'INIT_USERS',
      users,
    });
  };
};

export default reducer;
