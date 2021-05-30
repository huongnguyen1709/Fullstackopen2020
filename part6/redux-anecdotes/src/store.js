import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/anecdoteReducer';

const store = createStore(reducer);

export default store;
