import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';

const RootStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
