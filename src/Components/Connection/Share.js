import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { setShareData } from '../../Store/share';
import { pluck } from 'rp-utils';

const protocol = pluck(window,'location.protocol') || '';
const domain = pluck(window,'location.host') || '';

const shareUrl = id => `${protocol}//${domain}/#/room?id=${id}`

const ShareDialog = ({ share, handleClose }) => {
    return <Dialog title={'Copy URL Below'}
        contentStyle={{maxWidth: 320}}
        actions={[
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={handleClose}
            />,
            <FlatButton
                label="Copy"
                primary={true}
                keyboardFocused={true}
                onTouchTap={handleClose}
            />
        ]}
        modal={false}
        open={share ? true : false}
        onRequestClose={handleClose}
        bodyStyle={{overflow: 'hidden'}}>

        <TextField value={shareUrl(share)} />

    </Dialog>
}

export default connect(
    state => state,
    dispatch => ({
        handleClose: () => dispatch(setShareData(null))
    })
)(ShareDialog)