import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { enter } from 'redux-rtc';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { pluck } from 'rp-utils';
import { joinRoomRequest } from '../../track/rooms';

const JoinPrompt = ({ sharedId, join, close, children }) =>
    <Dialog title={"Would you like to join room id: " + sharedId}
        contentStyle={{maxWidth: 300}}
        actions={[
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={close}
            />,
            <FlatButton
                label="Join"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => join(sharedId)}
            />
        ]}
        modal={false}
        open={sharedId ? true : false}
        onRequestClose={close}>
        { children || '' }
    </Dialog>

export default connect(
    state => ({
        sharedId: pluck(state,'routing.locationBeforeTransitions.query.id')
    }),
    dispatch => ({
        join: (id) => {
            dispatch(push('/room'));
            dispatch(enter(id));
            joinRoomRequest();
        },
        close: () => dispatch(push('/'))
    })
)(JoinPrompt);