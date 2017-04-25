import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { enter } from 'redux-rtc';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { pluck } from 'rp-utils';
import { joinRoomRequest } from '../../track/rooms';
import { enterRoom } from '../../Store/join';

class JoinPrompt extends React.Component {
    render () {
        const { sharedId, enterRoomId, connection, join, close, children } = this.props;
        return (
            <Dialog title={
                sharedId ? 
                'Would you like to the join room?':
                'Enter the Room ID:'
            }
            contentStyle={{maxWidth: 300}}
            actions={[
                <FlatButton
                    label='Cancel'
                    primary={true}
                    onTouchTap={close}
                />,
                <FlatButton
                    label='Join'
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={() => join(sharedId || this.value)}
                />
            ]}
            modal={false}
            open={(sharedId || enterRoomId) ? true : false}
            onRequestClose={close}>
            { children || '' }
            { connection.error || '' }
            { 
                enterRoomId ? 
                <TextField 
                onChange={ev => this.value = ev.target.value}/>:
                ""
            }
        </Dialog>
        )
    }
}

export default connect(
    state => ({
        connection: pluck(state, 'rtc'),
        enterRoomId: pluck(state,'enterRoomId'),
        sharedId: pluck(state,'routing.locationBeforeTransitions.query.id')
    }),
    dispatch => ({
        join: (id) => {
            dispatch(enterRoom(false));
            dispatch(push('/room'));
            dispatch(enter(id));
            joinRoomRequest();
        },
        close: () => {
            dispatch(enterRoom(false));
            dispatch(push('/'));
        }
    })
)(JoinPrompt);