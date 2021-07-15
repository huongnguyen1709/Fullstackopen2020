import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS_WITH_GENRE, USER } from '../queries';

const Recommend = () => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS_WITH_GENRE);
  const [getUser, userResult] = useLazyQuery(USER);
  let books = [];
  let user = null;

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userResult.data && userResult.data.me) {
      user = userResult.data.me;
      getBooks({
        variables: { genreToSearch: user.favoriteGenre },
      });
    }
  }, [userResult]);

  // if (!show) {
  //   return null;
  // }

  if (result.data) {
    books = result.data.allBooks;
  }

  const onShowBooks = () => {
    if (books.length === 0)
      return (
        <p>there is no recommendations according to your favorite genre</p>
      );
    else
      return (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>

            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
  };

  console.log('huong');

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <strong>patterns</strong>
      </div>
      {onShowBooks()}
    </div>
  );
};

export default Recommend;
