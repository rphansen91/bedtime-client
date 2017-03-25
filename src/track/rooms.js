import { event } from './ga';

const CAT = 'ROOM';
const CREATE = 'CREATE';
const JOIN = 'JOIN';
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const SHARE = 'SHARE';

export const createRoomRequest = () => {
    event(CAT,CREATE,REQUEST);
}

export const createRoomSuccess = () => {
    event(CAT,CREATE,SUCCESS);
}

export const createRoomError = () => {
    event(CAT,CREATE,ERROR);
}

export const joinRoomRequest = () => {
    event(CAT,JOIN,REQUEST);
}

export const joinRoomSuccess = () => {
    event(CAT,JOIN,SUCCESS);
}

export const joinRoomError = () => {
    event(CAT,JOIN,ERROR);
}

export const shareRoomFacebook = () => {
    event(CAT,SHARE,'FACEBOOK');
}