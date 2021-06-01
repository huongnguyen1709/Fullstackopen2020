const reducer = (state = '', action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message;

    case 'REMOVE_NOTIFICATION':
      return '';

    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return async (dispatch) => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      message,
    });
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, time * 1000);
  };
};

export default reducer;
