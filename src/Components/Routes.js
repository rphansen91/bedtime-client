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
import LogoFeedback from './Feedback/Logos';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data,
  redirectAction: replace,
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated'
});

const BookIsSelected = UserAuthWrapper({
  authSelector: state => state.book ? state.book : false,
  redirectAction: replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'BookIsSelected'
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
            <Route path="/logos" component={LogoFeedback} /> 
            <Route path="/room" component={BookIsSelected(BookReader)} />
        </Route>
    </Router>
}

export default connect(
    state => ({ 
        book: state.book 
    }),
    dispatch => ({
        setPath: (p) => {
            dispatch(push(p));
        }
    })
)(Routing);