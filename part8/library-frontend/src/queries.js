import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addNewBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthorBirthyear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;
