import './Main.css';

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import TopBar from './TopBar/Bar';
import Menu from './TopBar/Menu';
import Routes from './Routes';
import Connections from './Connection/Drawer';
import Join from './Connection/Join';
import Share from './Connection/Share';
import LoginPrompt from './Auth/LoginPrompt';
import { fetchBooks } from '../Store/books';
import { pluck } from 'rp-utils';

injectTapEventPlugin();

class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      menuOpen: false
    }
  }
  componentDidMount () {
      this.props.search();
  }
  setMenu (menuOpen) {
    this.setState({ menuOpen })
  }
  render() {
    const { book, history, setPath } = this.props;
    const { menuOpen } = this.state;

    return (
      <MuiThemeProvider>
        <div>
          <TopBar 
            onOpen={this.setMenu.bind(this, true)} 
            onLogoTap={() => setPath('/')} />
          
          <Menu open={menuOpen} setDrawer={this.setMenu.bind(this)} 
            onTap={(p) => {
              this.setMenu(false);
              setPath(p)
            }}/>

          <Connections />
          <LoginPrompt open={false} />
          <Share />
          <Join />
          <Routes history={history} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(
    state => state,
    dispatch => ({
        search: (keywords) => {
            dispatch(fetchBooks(keywords || 'fairytale,nursery,childrens'))
        },
        setPath: (path) => {
          dispatch(push(path));
        }
    })
)(Main);