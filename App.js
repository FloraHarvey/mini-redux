import React from 'react';
import MyProvider from './my-react-redux/MyProvider';
import { createStore } from './my-redux';

import reducer from './reducers/user';

import LoginContainer from './containers/Login';

export default class App extends React.Component {

  render() {
    const store = createStore(reducer);

    return (
      <MyProvider store={store} >
        <LoginContainer greeting="Welcome" />
      </MyProvider>
    );
  }
}
