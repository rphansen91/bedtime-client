import { create } from 'redux-rtc';
import { pluck } from 'rp-utils';
import shareUrl from '../utils/shareUrl';
import { createRoomRequest, createRoomSuccess, createRoomError } from '../track/rooms';

const SET_SHARE_URL = 'SET_SHARE_URL';

export const setShareData = (payload) => {
    return (dispatch) => {
        if (window.plugins && window.plugins.socialsharing) {
            window.plugins.socialsharing.share(
                'Share with friends and family',
                null, null, shareUrl(payload)
            );
        } else {
            dispatch({
                type: SET_SHARE_URL,
                payload: payload
            });
        }
    }
}

export const openAndShare = () => {
    return (dispatch, getState) => {
        createRoomRequest();

        dispatch(create())
        .then(() => {
            const roomId = pluck(getState(), 'rtc.token');
            dispatch(setShareData(roomId));
            createRoomSuccess();
        })
        .catch(err => {
            console.log(err);
            createRoomError();
        })
    }
}

export const share = (state=null, action) => {
    switch (action.type) {
        case SET_SHARE_URL: return action.payload;
        default: return state; 
    }
}