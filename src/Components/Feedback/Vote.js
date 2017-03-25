import React from 'react';
import { Main, Center } from '../Display/Main';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Liked from 'material-ui/svg-icons/action/thumb-up';
import Disiked from 'material-ui/svg-icons/action/thumb-down';
import Paper from 'material-ui/Paper';

const actionIcon = {
    margin: 10
}

const container = {
    maxWidth: '100%',
    width: 320,
    padding: 10,
    fontSize: '2em',
    textAlign: 'center',
    display: 'inline-block',
}

const Container = ({ children }) =>
    <Center><Paper zDepth={3} style={container}>{ children }</Paper></Center>

export default class extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            voted: false
        }
    }
    vote (liked) {
        this.setState({ voted: true });
        this.props.voting && this.props.voting(liked);
    }
    render () {
        const { assumption } = this.props;
        const { voted } = this.state;
        return (
            <Main style={{height: '100%'}}>
                {
                    voted ?
                    <Container>
                        <p>Thanks for the Feedback!</p>
                    </Container>:
                    <Container>
                        <p>{ assumption }</p>
                        <FloatingActionButton 
                        style={actionIcon} 
                        onClick={this.vote.bind(this,false)}>
                            <Disiked />
                        </FloatingActionButton>
                        <FloatingActionButton 
                        style={actionIcon} 
                        onClick={this.vote.bind(this,true)}>
                            <Liked />
                        </FloatingActionButton>
                    </Container>
                }
            </Main>
        )
    }
}