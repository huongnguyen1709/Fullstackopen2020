import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnec } from './reducers/anecdoteReducer';
import { createAnec } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteAnec(id));
  };

  const addAnec = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.value = '';
    dispatch(createAnec(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default App;
