import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import createStore from '../my-redux';

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

    const { isLoggedIn } = state;

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
