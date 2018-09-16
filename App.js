import React from 'react';
import MyProvider from './my-react-redux/MyProvider';
import { createStore, applyMiddleware } from './my-redux';
import { logger } from './my-middleware/logger';
import { anotherLogger } from './my-middleware/anotherLogger';

import reducer from './reducers/user';

import LoginContainer from './containers/Login';

export default class App extends React.Component {

  render() {
    const store = createStore(reducer, {}, applyMiddleware([logger, anotherLogger]));

    return (
      <MyProvider store={store} >
        <LoginContainer greeting="Welcome" />
      </MyProvider>
    );
  }
}
