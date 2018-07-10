import React from 'react';
import PropTypes from 'prop-types';

import { StoreContext } from './MyProvider';

export const connect = (mapStateToProps, mapDispatchToProps) => {
  // If mapStateToProps (function) is specified, the new component will subscribe to Redux store updates.
  // This means that any time the store is updated, mapStateToProps will be called.
  // The result of mapStateToProps must be a plain object, which will be merged into the component’s props.


  return (WrappedComponent) => {

    class ConnectedComponent extends React.Component {

      componentDidMount() {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(mapStateToProps);
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const { store } = this.props;

        const state = store.getState();

        const stateToProps = mapStateToProps(state);

        return (
            <WrappedComponent {...stateToProps} />
        );
      }
    };

    ConnectedComponent.contextTypes = {
      store: PropTypes.object,
    }

    // Returns a function that takes a stateless component and returns a higher-order React component class
    // that passes state and action creators into your component derived from the supplied arguments.

    // In order to use React context consumer, there is an intermediary component that passes the store through to the connected
    // component as a prop so that it can be used by lifecycle methods

    const ConsumingComponent = () => {
      return (
        <StoreContext.Consumer>
          {store => <ConnectedComponent store={store} />}
        </StoreContext.Consumer>
      );
    };

    return ConsumingComponent;

  };


}
