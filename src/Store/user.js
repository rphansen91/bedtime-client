import { Flow } from 'rp-utils';
import { email, facebook, google } from '../utils/login';

const REQUEST_LOGIN = 'REQUEST_LOGIN';
const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
const ERROR_LOGIN = 'ERROR_LOGIN';
const RESET_USER = 'RESET_USER';

const requestLogin = (payload) => ({
    type: REQUEST_LOGIN,
    payload: payload
})

const receiveLogin = (payload) => ({
    type: RECEIVE_LOGIN,
    payload: payload
})

const errorLogin = (payload) => ({
    type: ERROR_LOGIN,
    payload: payload
})

const resetUser = (payload) => ({
    type: RESET_USER,
    payload: payload
})

const userState = (data, isLoading, isError) => ({
    data: data, isLoading, isError
})

const saveToken = t => Flow.tryCatch(
    () => localStorage.setItem('TOKEN', t)
)
const getToken = () => Flow.tryCatch(
    () => localStorage.getItem('TOKEN')
)
const deleteToken = () => Flow.tryCatch(
    () => localStorage.removeItem('TOKEN')
)

export const user = (state=userState(), action) => {
    switch (action.type) {
        case REQUEST_LOGIN: return userState(null,true,null);
        case RECEIVE_LOGIN: return userState(action.payload,false,null);
        case ERROR_LOGIN: return userState(null,false,action.payload);
        case RESET_USER: return userState(null);
        default: return state; 
    }
}

export const fetchUser = (type, data) => {
    return dispatch => {
        const login = () => {
            switch (type) {
                case "email": return email(data);
                case "facebook": return facebook();
                case "google": return google();
                default: return Promise.reject("No Provider");
            }
        }
        
        dispatch(requestLogin());
        return login()
        .then(user => {
            console.log(user);
            dispatch(receiveLogin(user));
        })
        .catch(err => {
            console.log(err);
            dispatch(errorLogin(err));
        })
    }
}

