import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import MyProvider from './redux-reimplementation/my-react-redux/MyProvider'
import createStore from './redux-reimplementation';

import reducer from './reducers/user';

import LoginContainer from './containers/Login';
import ProfileScreen from './components/ProfileScreen';

const RootStack = createStackNavigator({
  Home: { screen: LoginContainer },
  Profile: { screen: ProfileScreen },
});

export default class App extends React.Component {

  render() {
    const store = createStore(reducer);

    return (
      <MyProvider store={store} >
        <RootStack />
      </MyProvider>
    );
  }
}
