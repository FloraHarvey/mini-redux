import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerLeft: null,
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Button
          title="Logout"
          onPress={() =>
            navigate('Home')
          }
        />
      </View>
    );
  }
}
