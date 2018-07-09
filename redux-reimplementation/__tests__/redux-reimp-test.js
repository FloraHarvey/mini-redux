import createStore from '../index';
import reducer, { initialState } from '../../reducers/user';
import { login, logout } from '../../actions/user';

test('createStore creates a store object with an initial state', () => {
  const store = createStore(reducer);

  expect(store.getState()).toEqual(initialState);
});

test('the store dispatches actions and saves the updated state', () => {
  const store = createStore(reducer);

  store.dispatch(login());

  expect(store.getState()).toEqual({ isLoggedIn: true });
  store.dispatch(logout());
  expect(store.getState()).toEqual({ isLoggedIn: false });
});

test('the store can subscribe to change listeners which are called every time an action is dispatched', () => {
  const store = createStore(reducer);

  const mockListener = jest.fn();

  const unsubscribe = store.subscribe(mockListener);
  store.dispatch(login());
  store.dispatch(logout());
  unsubscribe();
  store.dispatch(login());

  expect(mockListener).toHaveBeenCalledTimes(2);
});
