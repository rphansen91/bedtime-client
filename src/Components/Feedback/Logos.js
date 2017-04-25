import React from 'react';
import Container from './Container';
import { Main, Center } from '../Display/Main';
import { init } from 'lean-feedback';
import Thanks from './Thanks';

const logoFeedback = init({
    url: 'https://lean-feedback.firebaseio.com/bedbyestory/',
    features: [{
        name: 'Logo_1',
        img: 'logos/bedbyeiconv1.png'
    }, {
        name: 'Logo_2',
        img: 'logos/bedbyeiconv2.png'
    }, {
        name: 'Logo_3',
        img: 'logos/bedbyeiconv3.png'
    }, {
        name: 'Logo_4',
        img: 'logos/bedbyeiconv4.png'
    }]
})

const Logo = ({ logo, selected }) =>
    <div style={{width: 100, height: 100, margin: 20, display: 'inline-block',
        borderRadius: 10,
        boxShadow: '2px 4px 5px rgba(0,0,0,0.4)',
        backgroundImage: `url(${logo.img})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer'}}
        onClick={() => {
            logo.voting(true);
            selected();
        }}>
    </div>

export default class extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    render () {
        const { selected } = this.state;
        return (
            <Main>{
                typeof selected === 'number' ?
                <Thanks />:    
                <Container>
                    <p>Which logo do you like best?</p>
                    { Object.keys(logoFeedback)
                        .map((logo, i) => 
                            <Logo 
                            key={logo} 
                            logo={logoFeedback[logo]} 
                            selected={() => this.setState({ selected: i })} />)
                    }
                </Container>
            }</Main>
        )
    }
}