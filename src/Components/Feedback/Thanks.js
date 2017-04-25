import React from 'react'
import Check from 'material-ui/svg-icons/action/check-circle'
import Container from './Container';

export default () => 
    <Container>
        <Check style={{fill: 'green', width: 40, height: 40}} />
        <p>Thanks for the Feedback!</p>
    </Container>