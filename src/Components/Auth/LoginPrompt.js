import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Login from './Login';

const LoginPrompt = ({ open }) =>
    <Dialog title={'Login To Account'}
            contentStyle={{textAlign: 'center',maxWidth: 300,overflow:'hidden'}}
            modal={true}
            open={open}><Login /></Dialog>

export default LoginPrompt;