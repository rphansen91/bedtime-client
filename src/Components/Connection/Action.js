import React from 'react';
import { connect } from 'react-redux';
import { create } from 'redux-rtc';
import { setShareData, openAndShare } from '../../Store/share';
import { enterRoom } from '../../Store/join';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CircularProgress from 'material-ui/CircularProgress';
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

const RoomMenu = ({ onCreate, onJoin }) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon color="#fff" /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem 
    onTouchTap={onCreate} 
    primaryText="Create Room" />
    <MenuItem 
    onTouchTap={onJoin} 
    primaryText="Join Room" />
  </IconMenu>
);

const Action = ({ roomId, loading, onShare, onCreate, onJoin }) => {
    if (loading) return <CircularProgress color="#fff" />
    if (roomId) return <Copy onTap={() => onShare(roomId)} />
    return <RoomMenu onCreate={onCreate} onJoin={onJoin} />
}

export default connect(
    state => ({
        roomId: state.rtc.token,
        loading: state.rtc.loading
    }),
    (dispatch, props) => ({
        onShare: (roomId) => dispatch(setShareData(roomId)),
        onCreate: () => dispatch(openAndShare()),
        onJoin: () => dispatch(enterRoom(true))
    }))(Action);