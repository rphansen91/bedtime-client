const SET_BOOK = 'SET_BOOK';

export const setBookData = (payload) => ({
    type: SET_BOOK,
    payload: payload,
    connected: true
})

export const book = (state=null, action) => {
    switch (action.type) {
        case SET_BOOK: return action.payload;
        default: return state; 
    }
}