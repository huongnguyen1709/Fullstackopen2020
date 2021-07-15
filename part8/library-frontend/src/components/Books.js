import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [filterBooks, setFilterBooks] = useState(null);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  let books = [];
  const genreButtons = [];

  books = result.data.allBooks;

  const showGenreBooks = (genre) => {
    const booksFilter = books.filter((book) => {
      const found = book.genres.find((g) => g === genre);
      if (found) return book;
      else return null;
    });
    setFilterBooks(booksFilter);
  };

  books.map((book) => {
    return book.genres.map((genre) => {
      const found = genreButtons.find((g) => g === genre);
      if (!found) return genreButtons.push(genre);
      else return null;
    });
  });

  const bookList = () => {
    if (filterBooks) {
      return filterBooks.map((a) => (
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ));
    } else {
      return books.map((a) => (
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ));
    }
  };

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <strong>patterns</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList()}
        </tbody>
      </table>

      <div>
        {genreButtons.map((genre) => (
          <button key={genre} onClick={() => showGenreBooks(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilterBooks(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
