import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import createStore from '../redux-reimplementation';

import reducer from '../reducers/user';
import { login, logout } from '../actions/user';


export default class HomeScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Welcome',
  };

  onLogout = () => {
    return null;
  }

  render() {
    const { navigate } = this.props.navigation;

    const store = createStore(reducer);

    const state = store.getState();
    const { isLoggedIn } = state;

    console.log(`store.getState()`, store.getState());
    console.log(`store.dispatch(login)`, store.dispatch(login));
    console.log(`store.getState()`, store.getState());
    console.log(`store.dispatch(logout)`, store.dispatch(logout));
    console.log(`store.getState()`, store.getState());

    return (
      <View>
        {!isLoggedIn ? <Button
          title="Login"
          onPress={() => {
            this.isLoggedIn = true;
          }}
        /> : null}
        {isLoggedIn ? <View>
            <Button
              title="Logout"
              onPress={() => onLogout}
            />
          </View>
        : null}
      </View>
    );
  }
}

// class LoggedInComponent extends React.PureComponent {
//   render() {
//     const { isLoggedIn, onLogout } = this.props;
//     const store = createStore(reducer);
//
//     console.log(`store.getState()`, store.getState());
//     console.log(`store.dispatch(login)`, store.dispatch(login));
//     console.log(`store.getState()`, store.getState());
//     console.log(`store.dispatch(logout)`, store.dispatch(logout));
//     console.log(`store.getState()`, store.getState());
//
//     return (
//
//     );
//   }
// }
