import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router';
import { push, replace} from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import trackFeatures from '../track/features';
import BookShelf from './Reader/BookShelf';
import BookReader from './Reader/BookReader';
import ReviewBooks from './Review/Books';
import Vote from './Feedback/Vote';
import Comment from './Feedback/Comment';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data,
  redirectAction: replace,
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated'
})

const { library, buy, support } = trackFeatures

const LibraryFeedback = () => 
    <Vote assumption={library.assumption} 
    voting={library.voting} />

const BuyFeedback = () =>
    <Vote assumption={buy.assumption} 
    voting={buy.voting} />

const Support = () =>
    <Comment assumption={support.assumption}
    submit={support.comment} />

const Routing = ({ history, book, setPath }) => {
    return <Router history={history}>
        <Route path="/">
            <IndexRoute component={BookShelf} />
            <Route path="/rev" component={ReviewBooks} />
            <Route path="/library" component={LibraryFeedback} />
            <Route path="/buy" component={BuyFeedback} />
            <Route path="/support" component={Support} />
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