import React from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionClose from 'material-ui/svg-icons/navigation/close';
import ActionGo from 'material-ui/svg-icons/navigation/arrow-forward';
import TextField from 'material-ui/TextField';
import FacebookIcon from './Icons/Facebook';
import GoogleIcon from './Icons/Google';
import EmailIcon from './Icons/Email';
import { fetchUser } from '../../Store/user';

const size = {width: 170,margin:4}
const iconSize = {width:20,height:20}

class Login extends React.Component {
   constructor (props) {
       super(props);
       this.state = {
           visible: false
       };
       this.form = {};
   }
   setVisible (visible) {
       this.setState({ visible })
   }
   handleChange (type) {
        this.form[type] = '';
        return (ev) => {
            console.log(ev);
            this.form[type] = ev.target.value;
            console.log(this.form);
        }
   }
   emailLogin () {
       if (!this.form.email || !this.form.password) return;
       this.props.login('email', this.form);
   }
   render () {
        const { visible } = this.state;
        const { user, login } = this.props;
        return <div>
            <List>
            {/*<RaisedButton
                style={size}
                label="Google"
                labelPosition="after"
                icon={<GoogleIcon style={iconSize} />}
                onTouchTap={login.bind(null, 'google')}
            /><br />*/}
            <RaisedButton
                style={size}
                label="Facebook"
                labelPosition="after"
                icon={<FacebookIcon style={iconSize} />}
                onTouchTap={login.bind(null, 'facebook')}
            />
            {/*<br />
            <ListItem
              style={{marginTop: 20}}
              primaryText="Email"
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <TextField
                    key={1}
                    style={size}
                    hintText="Email"
                    type="email"
                    errorText=""
                    onKeyUp={this.handleChange('email')}
                    />,
                <TextField
                    key={2}
                    style={size}
                    hintText="Password"
                    type="password"
                    errorText=""
                    onKeyUp={this.handleChange('password')}
                    />,
                <IconButton key={3} 
                    onTouchTap={this.emailLogin.bind(this)}
                    style={{position:'relative',display:'block',marginLeft: 'auto'}}>
                    <ActionGo />
                </IconButton>
              ]} />*/}
            </List>
        </div>
    }
}

export default connect(
    state => state,
    dispatch => ({
        login: (type, data) => {
            dispatch(fetchUser(type, data))
        }
    })
)(Login);