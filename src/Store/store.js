import { hashHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connected, rtc } from 'redux-rtc'
import createLogger from 'redux-logger'

import { user } from './user';
import { books } from './books';
import { book } from './book';
import { share } from './share';

const rootReducer = combineReducers({
    book,
    books,
    user,
    share,
    rtc,
    routing: routerReducer
});

export default createStore(
  rootReducer, 
  applyMiddleware(createLogger(), connected, routerMiddleware(hashHistory))
);