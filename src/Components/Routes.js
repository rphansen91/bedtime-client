import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router';
import { push, replace} from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import BookShelf from './Reader/BookShelf';
import BookReader from './Reader/BookReader';
import ReviewBooks from './Review/Books';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data,
  redirectAction: replace,
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated'
})

const Routing = ({ history, book, setPath }) => {
    return <Router history={history}>
        <Route path="/">
            <IndexRoute component={BookShelf} />
            <Route path="/rev" component={ReviewBooks} />
            <Route path="/room" component={BookReader}
                onEnter={() => {
                    console.log('BOOK',book);
                    {/*if (!book) setPath('/');*/}
                }} />
        </Route>
    </Router>
}

export default connect(
    state => state,
    dispatch => ({
        setPath: (p) => {
            dispatch(push(p));
        }
    })
)(Routing);