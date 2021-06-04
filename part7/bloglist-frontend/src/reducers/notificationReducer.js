let timeoutID;

const initialState = {
  message: '',
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...action.notification };

    case 'REMOVE_NOTIFICATION':
      return { ...initialState };

    default:
      return state;
  }
};

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    await dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      });
    }, time * 1000);
  };
};

export default reducer;
