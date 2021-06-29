import React from 'react';
import { useQuery } from '@apollo/client';
import { USER, ALL_BOOKS } from '../queries';

const Recommend = ({ show }) => {
  const result = useQuery(USER);
  const allBooks = useQuery(ALL_BOOKS);
  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = allBooks.data.allBooks;
  const user = result.data.me;
  let recommendBooks = [];
  books.map((book) => {
    const found = book.genres.find((g) => g === user.favoriteGenre);
    if (found) return recommendBooks.push(book);
    else return null;
  });

  const showRecommendation = () => {
    if (recommendBooks.length === 0)
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

            {recommendBooks.map((a) => (
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

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <strong>patterns</strong>
      </div>
      {showRecommendation()}
    </div>
  );
};

export default Recommend;
