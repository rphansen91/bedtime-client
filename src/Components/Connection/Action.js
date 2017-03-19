import React from 'react';
import { connect } from 'react-redux';
import { create } from 'redux-rtc';
import { setShareData, openAndShare } from '../../Store/share';
import IconButton from 'material-ui/IconButton';
import IconCam from 'material-ui/svg-icons/av/videocam';
import Share from 'material-ui/svg-icons/social/share';

const Cam = ({ onTap }) => 
    <IconButton onTouchTap={onTap}>
        <IconCam color="#fff" />
    </IconButton>;

const Copy = ({ onTap }) => 
    <IconButton onTouchTap={onTap}>
        <Share color="#fff" />
    </IconButton>;

const Action = ({ roomId, onShare, createRoom }) => 
    roomId ? 
        <Copy onTap={() => onShare(roomId)} /> : 
        <Cam onTap={createRoom}/>;

export default connect(
    state => ({
        roomId: state.rtc.token
    }),
    (dispatch, props) => ({
        onShare: (roomId) => dispatch(setShareData(roomId)),
        createRoom: () => dispatch(openAndShare())
    }))(Action);