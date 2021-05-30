import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnec } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { removeNotification } from '../reducers/notificationReducer';

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
  const anecdotes = useSelector((state) => state.anecdotes);

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleVote={() => {
            dispatch(voteAnec(anecdote.id));
            dispatch(setNotification(`you voted '${anecdote.content}'`));
            setTimeout(() => {
              dispatch(removeNotification());
            }, 5000);
          }}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
