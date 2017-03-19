import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { setShareData } from '../../Store/share';
import { pluck } from 'rp-utils';
import fbUI from '../../Facebook/ui';
import FacebookIcon from '../Auth/Icons/Facebook';

const protocol = pluck(window,'location.protocol') || '';
const domain = pluck(window,'location.host') || '';

const shareUrl = id => `${protocol}//${domain}/#/room?id=${id}`

const ShareDialog = ({ share, user, invite, book, handleClose }) => {
    const providerData = pluck(user, 'data.user.providerData') || [];
    const userId = pluck(providerData[0], 'uid');
    return <Dialog title={'Share With Family And Friends'}
        contentStyle={{maxWidth: '100%',width: 420}}
        actions={[
            <FlatButton
                label="Cancel"
                onTouchTap={handleClose}
            />,
            <FlatButton
                label="Messenger"
                keyboardFocused={true}
                labelPosition="after"
                icon={<FacebookIcon style={{width:20,height:20}} />}
                onTouchTap={() => invite(null, share)}
            />
        ]}
        modal={false}
        open={share ? true : false}
        onRequestClose={handleClose}
        bodyStyle={{overflow: 'hidden'}}>

        {/*
            (pluck(user, 'data.friends') || [])
            .map((friend, i) => 
                <div key={i} onClick={() => invite(friend.uid, share)}>
                    { JSON.stringify(friend) }
                </div>)
        */}

        {/*<TextField value={shareUrl(share)} fullWidth={true} />*/}

    </Dialog>
}

export default connect(
    state => state,
    dispatch => ({
        handleClose: () => dispatch(setShareData(null)),
        invite: (friendId, share) => {
            dispatch(setShareData(null))
            fbUI({
                method: 'send',
                to: friendId,
                redirect_uri: pluck(window, 'location.href'),
                link: 'https://bedbyestory.com/#/room?id=' + share
            })
        }
    })
)(ShareDialog)