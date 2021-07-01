import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token');
  console.log('token in index', token);
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});
const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  onError: ({ response, networkError }) => {
    if (networkError && networkError.statusCode === 401) {
      console.log(response); // prints 'undefined'
      response.errors = null; // will throw 'undefined' error
      response = { errors: null }; // will throw a 'read-only' error
    }
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
