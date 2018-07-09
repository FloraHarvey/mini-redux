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

test('the dispatch function returns an error if the action is not an object', () => {
  const store = createStore(reducer);

  const invalidAction = () => 'I am not an object';

  expect(() => store.dispatch(invalidAction())).toThrowError('Action must be an object with a "type" field');
});

test('the dispatch function returns an error if the action does not have a type field', () => {
  const store = createStore(reducer);

  const invalidAction = () => { name: 'John' };

  expect(() => store.dispatch(invalidAction())).toThrowError('Action must be an object with a "type" field');
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
