import React from 'react';
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import store from './Store/store';
import Main from './Components/Main';

const history = syncHistoryWithStore(hashHistory, store);

export default () => 
  <Provider store={store}>
    <Main history={history} />
  </Provider>
