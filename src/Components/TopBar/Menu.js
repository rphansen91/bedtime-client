import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Home from 'material-ui/svg-icons/action/dashboard';
import Card from 'material-ui/svg-icons/action/credit-card';
import Library from 'material-ui/svg-icons/maps/local-library';
import Support from 'material-ui/svg-icons/action/face';

export default ({ open, setDrawer, onTap }) =>
    <Drawer open={open} width={300} docked={false}
        onRequestChange={o => setDrawer(o)}>

        <MenuItem onClick={()=>onTap('/')} leftIcon={<Home />}>Home</MenuItem>
        <MenuItem onClick={()=>onTap('/buy')} leftIcon={<Card />}>Buy</MenuItem>
        <MenuItem onClick={()=>onTap('/library')} leftIcon={<Library />}>My Library</MenuItem>
        <MenuItem onClick={()=>onTap('/support')} leftIcon={<Support />}>Support</MenuItem>
    </Drawer>