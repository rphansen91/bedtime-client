import React from 'react';
import { Main, Center } from '../Display/Main';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Liked from 'material-ui/svg-icons/action/thumb-up';
import Disiked from 'material-ui/svg-icons/action/thumb-down';
import Paper from 'material-ui/Paper';
import Container from './Container';
import Thanks from './Thanks';

const actionIcon = {
    margin: 10
}

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
                    <Thanks />:
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