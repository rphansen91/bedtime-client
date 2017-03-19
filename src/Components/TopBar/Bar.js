import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import Action from '../Connection/Action';

const Menu = ({ onTap }) => 
    <IconButton onTouchTap={onTap}>
        <IconMenu color="#fff" />
    </IconButton>

export default ({ onOpen, onLogoTap, title }) => 
    <AppBar 
        style={{position: 'fixed'}}
        title={
            <span style={{cursor: 'pointer',fontFamily: 'chalkboard'}} 
            onClick={onLogoTap}>{ title || "Bed Bye Story" }</span>
        }
        iconElementLeft={<Menu onTap={onOpen} />}
        iconElementRight={<Action />} />