const createStore = (reducer) => {
  const initialState = reducer(undefined, { type: 'Initial action' });
  let state = initialState;

  const listeners = [];

  const store = {
    getState: () => state,
    dispatch: (action) => {
      // dispatch takes an action object and updates the store.
      // The dispatch function verifies that the action is legitimate (is an object with a "type") and calls the store's reducer function (the one used in createStore).
      if (typeof action !== 'object' || !action.type) throw new Error('Action must be an object with a "type" field');

      // The arguments passed to the reducer are the current state of the store and the dispatched action.
      // The result returned by the reducer is set as the new state of the store
      state = reducer(state, action);
      console.log(`listeners`, listeners);
      // all of the subscribed callback functions are called.
      listeners.forEach(listener => listener());
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

  return store;
};


export default createStore;
