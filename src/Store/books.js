import getBooks from '../utils/books';

const REQUEST_BOOKS = 'REQUEST_BOOKS';
const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
const ERROR_BOOKS = 'ERROR_BOOKS';

const requestBooks = (payload) => ({
    type: REQUEST_BOOKS,
    payload: payload
})

const receiveBooks = (payload) => ({
    type: RECEIVE_BOOKS,
    payload: payload
})

const errorBooks = (payload) => ({
    type: ERROR_BOOKS,
    payload: payload
})

const bookState = (data, isLoading, isError) => ({
    data: data, isLoading, isError
})

export const books = (state=bookState(), action) => {
    switch (action.type) {
        case REQUEST_BOOKS: return bookState(null,true,null);
        case RECEIVE_BOOKS: return bookState(action.payload,false,null);
        case ERROR_BOOKS: return bookState(null,false,action.payload);
        default: return state; 
    }
}

export const fetchBooks = (keywords) => {
    return dispatch => {
        dispatch(requestBooks());
        return getBooks(keywords)
        .then(books => {
            console.log(books);
            dispatch(receiveBooks(books));
        })
        .catch(err => {
            console.log(err);
            dispatch(errorBooks(err));
        })
    }
}