import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  if (!props.show) {
    return null;
  }
  let authors = [];

  if (result.loading) {
    return <div>loading...</div>;
  }

  console.log(result);
  authors = result.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born } });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <label>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors &&
              authors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
          </select>
        </label>

        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value, 10))}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default Authors;
