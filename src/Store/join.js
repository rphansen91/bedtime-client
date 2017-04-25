const ENTER_ROOM_PROMPT = 'ENTER_ROOM_PROMPT';

export const enterRoom = (payload) => ({
    type: ENTER_ROOM_PROMPT,
    payload: payload ? true : false
})

export const enterRoomId = (state=false, action) => {
    switch (action.type) {
        case ENTER_ROOM_PROMPT: return action.payload;
        default: return state; 
    }
}