import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import loggedInUserReducer from './reducers/loggedInUserReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loggedInUserReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
