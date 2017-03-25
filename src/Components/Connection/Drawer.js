import React from 'react';
import { connect } from 'react-redux';
import { create } from 'redux-rtc';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconCam from 'material-ui/svg-icons/av/videocam';
import Stream from './Stream';
import Login from '../Auth/Login';
import { pluck } from 'rp-utils';
import { Header, Title } from '../Display/Header';
import Action from './Action';
import { openAndShare } from '../../Store/share';

const Empty = () => <div></div>

const RoomButton = ({ onTap, label }) => 
    <RaisedButton label={label}
        style={{marginTop: 20}}
        onTouchTap={onTap}
        labelPosition="before"
        secondary={true}
        icon={<IconCam />}>
    </RaisedButton>

const StreamDrawer = ({ streams, loggedIn, joinRoom }) =>
    <Drawer open={true} width={300} openSecondary={true} className="connection-drawer">
        <AppBar title="Peers" 
            className="connection-bar"
            style={{height: 60}}
            iconElementLeft={<Empty />}
            iconElementRight={<Action />} />
        
        {
            streams.length?
                streams.map((s, i) => <Stream key={i} stream={s} />):
                <Header img="https://bedbyestory.com/library/imgs/main.jpg" style={{height: 'calc(100% - 60px)'}}>
                    <Title>Get Started!</Title>
                    {
                        !loggedIn ?
                            <Login />:
                            <RoomButton label={"Create Room"} 
                                onTap={() => joinRoom()} />
                    }
                </Header>
        }
    </Drawer>

export default connect(
    state => ({
        loggedIn: true || pluck(state,'user.data'),
        streams: state.rtc.streams
    }),
    (dispatch) => ({
        joinRoom: () => dispatch(openAndShare())
    })
)(StreamDrawer);