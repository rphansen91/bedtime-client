import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default ({ active, style }) =>
    <div style={style}>
        {active ? 
            <CircularProgress size={80} thickness={5} /> : 
            ''}
    </div>
