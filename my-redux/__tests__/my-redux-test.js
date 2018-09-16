import { createStore, combineReducers, applyMiddleware } from '../index';
import userReducer, { initialState } from '../../reducers/user';
import favouritesReducer from '../../reducers/favourites';
import { login, logout } from '../../actions/user';

describe('store', () => {

  test('createStore creates a store object with an initial state', () => {
    const store = createStore(userReducer);

    expect(store.getState()).toEqual(initialState);
  });

  test('the store dispatches actions and saves the updated state', () => {
    const store = createStore(userReducer);

    store.dispatch(login());

    expect(store.getState()).toEqual({ isLoggedIn: true });
    store.dispatch(logout());
    expect(store.getState()).toEqual({ isLoggedIn: false });
  });

  test('the dispatch function returns an error if the action is not an object', () => {
    const store = createStore(userReducer);

    const invalidAction = () => 'I am not an object';

    expect(() => store.dispatch(invalidAction())).toThrowError('Action must be an object with a "type" field');
  });

  test('the dispatch function returns an error if the action does not have a type field', () => {
    const store = createStore(userReducer);

    const invalidAction = () => { name: 'John' };

    expect(() => store.dispatch(invalidAction())).toThrowError('Action must be an object with a "type" field');
  });

  test('the store can subscribe to change listeners which are called every time an action is dispatched', () => {
    const store = createStore(userReducer);

    const mockListener = jest.fn();

    const unsubscribe = store.subscribe(mockListener);
    store.dispatch(login());
    store.dispatch(logout());
    unsubscribe();
    store.dispatch(login());

    expect(mockListener).toHaveBeenCalledTimes(2);
  });
});

describe('combineReducers', () => {
  test('combineReducers takes a reducers object and returns a function that constructs a state object using each reducer', () => {
    const combinedReducer = combineReducers({ user: userReducer, favourites: favouritesReducer});

    expect(combinedReducer({favourites: 5}, {type: 'LOGIN'})).toEqual({user: {isLoggedIn: true}, favourites: 5});
  });

  test('combinedReducers throws an error if any reducer returns undefined', () => {
    const mockReducer = jest.fn();
    mockReducer.mockReturnValue(undefined);

    expect(() => combineReducers({mock: mockReducer})).toThrowError('Reducers passed to combineReducers must not return undefined');
  });

});

describe('applyMiddleware', () => {
  it('takes an array of middlewares and returns a function that takes the store as an argument and wraps its dispatch method with the chained middlewares', () => {
    const middleware = jest.fn();
    const middlewareReturnFunction = jest.fn();
    const wrappedDispatch = jest.fn();

    middleware.mockReturnValue(middlewareReturnFunction);
    middlewareReturnFunction.mockReturnValue(wrappedDispatch)

    const getState = jest.fn();
    const dispatch = jest.fn();
    const store = {
      getState,
      dispatch,
    }

    applyMiddleware([middleware])(store);
    expect(middleware).toHaveBeenCalledWith(
      expect.objectContaining({
        getState,
        dispatch
      })
    );
    expect(store.dispatch).toEqual(wrappedDispatch);
  });
});
