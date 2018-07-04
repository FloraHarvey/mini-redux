const createStore = (reducer) => {
  const initialState = reducer(undefined, { type: 'Initial action' });
  let state = initialState;

  const store = {
    getState: () => state,
    dispatch: (actionCreator) => {
      const action = actionCreator();
      state = reducer(state, action);
    },
    subscribe: (listener) => {

    },
  };

  return store;
};


export default createStore;
