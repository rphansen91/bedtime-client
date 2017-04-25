import React from 'react';
import Paper from 'material-ui/Paper';
import { Center } from '../Display/Main';

const container = {
    width: 320,
    padding: 10,
    maxWidth: '100%',
    fontSize: '2em',
    textAlign: 'center',
    display: 'inline-block',
}

export default ({ children }) =>
    <Center>
        <Paper 
        zDepth={3} 
        style={container}>
        { children }
        </Paper>
    </Center>
