import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnec } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ content, votes, handleVote }) => {
  return (
    <li>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </li>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      const filter = state.filter.toLowerCase();
      const anecFilter = state.anecdotes.filter(
        (anec) => anec.content.toLowerCase().indexOf(filter) !== -1
      );
      return anecFilter;
    }
    return state.anecdotes;
  });

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleVote={() => {
            dispatch(voteAnec(anecdote));
            dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
          }}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
