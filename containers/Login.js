import React from 'react';
import { View, Button, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from '../my-react-redux/myConnect';

import { login, logout } from '../actions/user';


class LoginContainer extends React.PureComponent {

  render() {
    const { isLoggedIn } = this.props;

    return (
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <Text>{this.props.greeting}</Text>
        {!isLoggedIn ? <Button
          title="Login"
          onPress={() => this.props.login()}
        /> : null}
        {isLoggedIn ? <Button
            title="Logout"
            onPress={() => this.props.logout()}
          />
          : null }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

// example mapDispatchToProps as an object:
// const mapDispatchToProps = {
//   login,
// };

// example mapDispatchToProps as a function
const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  };
};


LoginContainer.contextTypes = {
  store: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
