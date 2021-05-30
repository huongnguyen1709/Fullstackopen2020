const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.anecdotes;
    case 'VOTE':
      state.find((anec) => anec.id === action.id).votes++;
      state.sort((a, b) => (a.votes > b.votes ? -1 : 1));
      return [...state];
    case 'NEW_ANECDOTE':
      return [...state, action.data];

    default:
      return state;
  }
};

export const initializeAnec = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    anecdotes,
  };
};

export const voteAnec = (id) => {
  return {
    type: 'VOTE',
    id,
  };
};

export const createAnec = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export default reducer;
