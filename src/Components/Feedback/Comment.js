import React from 'react';
import { Main, Center } from '../Display/Main';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Go from 'material-ui/svg-icons/navigation/arrow-forward';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const actionIcon = {
    margin: 10
}

const container = {
    width: 320,
    padding: 10,
    maxWidth: '100%',
    fontSize: '2em',
    textAlign: 'center',
    display: 'inline-block',
}

const Container = ({ children }) =>
    <Center><Paper zDepth={3} style={container}>{ children }</Paper></Center>

export default class extends React.Component {
    constructor (props) {
        super(props);
        this.message = "";
        this.state = {
            sent: false
        }
    }
    submit () {
        const message = (this.message || "").trim();
        if (!message) return;

        this.setState({ sent: true });
        this.props.submit && this.props.submit(message);
    }
    render () {
        const { assumption } = this.props;
        const { sent } = this.state;
        return (
            <Main style={{height: '100%'}}>
                {
                    sent ?
                    <Container>
                        <p>Thanks for the Feedback!</p>
                    </Container>:
                    <Container>
                        <p>{ assumption }</p>
                        <TextField
                        onKeyUp={e => this.message = e.target.value}
                        hintText="Enter bugs, issues, or feedback"
                        multiLine={true} />
                        <FloatingActionButton style={actionIcon} onClick={this.submit.bind(this)}>
                            <Go />
                        </FloatingActionButton>
                    </Container>
                }
            </Main>
        )
    }
}