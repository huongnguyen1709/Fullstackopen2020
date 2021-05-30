const initialState = 'Default Notification';

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
