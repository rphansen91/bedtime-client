import { create } from 'redux-rtc';
import { pluck } from 'rp-utils';

const SET_SHARE_URL = 'SET_SHARE_URL';

export const setShareData = (payload) => ({
    type: SET_SHARE_URL,
    payload: payload
})

export const openAndShare = () => {
    return (dispatch, getState) => {
        dispatch(create())
        .then(() => {
            const roomId = pluck(getState(), 'rtc.token');
            dispatch(setShareData(roomId));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const share = (state=null, action) => {
    switch (action.type) {
        case SET_SHARE_URL: return action.payload;
        default: return state; 
    }
}