import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'INIT_ANECDOTES':
      const anecdotes = action.data;
      anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1));
      return [...anecdotes];
    case 'VOTE_ANECDOTE':
      state.find((anec) => anec.id === action.id).votes++;
      return [...state];
    case 'NEW_ANECDOTE':
      return [...state, action.data];

    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    console.log(anecdotes);
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const voteAnec = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.updateVotes(anecdote);
    dispatch({
      type: 'VOTE_ANECDOTE',
      id: anecdote.id,
    });
  };
};

export const createAnec = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnec,
    });
  };
};

export default reducer;
