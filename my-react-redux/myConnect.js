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
        this.unsubscribe = store.subscribe(this.updateComponent);
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      updateComponent = () => {
        this.forceUpdate();
      }

      render() {
        const { store } = this.props;

        const state = store.getState();

        const stateToProps = mapStateToProps(state);

        let dispatchProps;

        // if mapDispatchToProps is not provided, the dispatch function is injected into props
        if (!mapDispatchToProps) {
          dispatchProps = {
            dispatch: store.dispatch,
          };
        }

        // if mapDispatchToProps is an object, it is assumed that each fucntion is an action creator.
        // An object with the same function names, but with each action creator wrapped in a dispatch call so they may
        // be invoked directly, is injected into props
        if (typeof mapDispatchToProps === 'object') {
          dispatchProps = {};
          Object.keys(mapDispatchToProps).forEach(k => {
            dispatchProps[k] = () => store.dispatch(mapDispatchToProps[k]());
          });
        }

        // If a function is passed, it will be given dispatch as the first parameter
        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(store.dispatch, this.props);
        }

        return (
            <WrappedComponent {...stateToProps} {...dispatchProps} />
        );
      }
    }

    ConnectedComponent.contextTypes = {
      store: PropTypes.object,
    };

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

};
