export const createStore = (reducer, preloadedState, storeEnhancer) => {
  const initialState = reducer(undefined, { type: 'Initial action' });
  let state = initialState; // TODO - is there a better place to keep the state

  const listeners = [];

  const store = {
    getState: () => state,
    dispatch: (action) => {
      // dispatch takes an action object and updates the store.
      // The dispatch function verifies that the action is legitimate (is an object
      // with a "type") and calls the store's reducer function (the one used in createStore).
      if (typeof action !== 'object' || !action.type) throw new Error('Action must be an object with a "type" field');

      // The arguments passed to the reducer are the current state of the store and the dispatched action.
      // The result returned by the reducer is set as the new state of the store
      state = reducer(state, action);
      // all of the subscribed callback functions are called.
      listeners.forEach(listener => listener()); // TODO: don't update every component every time an action is dispatched
    },
    subscribe: (listener) => {
      // subscribe takes a callback function and appends it to a list of listeners.
      // Whenever the store is updated (as a result of a dispatch), all of the subscribed callback functions are called.
      // To get the current state, call store.getState() in the store.subscribe callback.
      listeners.push(listener);

      // returns a function that can be called to unsubscribe from listening to the store
      return () => listeners.pop();
    },
  };

  if (storeEnhancer) {
    storeEnhancer(store); // TODO: don't mutate the store
  }

  return store;
};

// Takes object whose values correspond to different reducing functions and
// returns single reducing function that can be passed to createStore.
export const combineReducers = (reducersObject) => {
  // throw if a reducer returns undefined
  Object.keys(reducersObject).forEach((k) => {
    if (reducersObject[k](undefined, {type: 'Test action'}) === undefined) {
      throw new Error('Reducers passed to combineReducers must not return undefined');
    }
  });

  // returns a function that constructs state object with same shape as reducersObject
  // by calling each reducer function
  return (prevState, action) => {
    const newState = {};
    Object.keys(reducersObject).forEach((key) => {
      // passes correct part of state to each reducer (or undefined)
      const state = prevState !== undefined ? prevState[key] : prevState;
      // namespaces the states returned by each reducing function under keys passed to in reducersObject
      newState[key] = reducersObject[key](state, action);
    });
    return newState;
  };
};

export const applyMiddleware = (middlewares) => (store) => { // TODO this should take createStore & return createStore
  middlewares.reverse();
  const { getState, dispatch } = store;
  let dispatchWithMiddleware = store.dispatch;

  // Transform dispatch function with each middleware.
  middlewares.forEach(middleware => {
    dispatchWithMiddleware = middleware({ getState, dispatch })(dispatchWithMiddleware)
  });

  store.dispatch = dispatchWithMiddleware;

};
