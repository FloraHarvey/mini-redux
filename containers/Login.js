import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from '../redux-reimplementation/my-react-redux/myConnect';

import reducer from '../reducers/user';
import { login, logout } from '../actions/user';


class LoginContainer extends React.PureComponent {
  static navigationOptions = {
    title: 'Login',
  };

  onLogout = () => {
    return null;
  }

  render() {
    const { isLoggedIn } = this.props;

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

const mapStateToProps = (state) => {
  return { isLoggedIn: state.isLoggedIn }
}

LoginContainer.contextTypes = {
  store: PropTypes.object
}

export default connect(mapStateToProps)(LoginContainer);
