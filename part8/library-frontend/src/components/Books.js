import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [filterBooks, setFilterBooks] = useState(null);
  if (!props.show) {
    return null;
  }

  let books = [];
  if (result.loading) {
    return <div>loading...</div>;
  }

  books = result.data.allBooks;

  const showGenreBooks = (genre) => {
    const booksFilter = books.filter((book) => {
      const found = book.genres.find((g) => g === genre);
      if (found) return book;
      else return null;
    });
    setFilterBooks(booksFilter);
  };

  const onGenresList = () => {
    const genresList = [];
    books.map((book) => {
      book.genres.map((genre) => {
        const item = genresList.find((g) => g === genre);
        if (!item) genresList.push(genre);
        else return null;
      });
    });
    return genresList.map((genre) => (
      <button key={genre} onClick={() => showGenreBooks(genre)}>
        {genre}
      </button>
    ));
  };

  const booksList = () => {
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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksList()}
        </tbody>
      </table>

      <div>
        {onGenresList()}
        <button onClick={() => setFilterBooks(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
