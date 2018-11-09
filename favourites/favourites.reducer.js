export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        [action.favourite]: true,
      };
    case 'REMOVE':
      return {
        ...state,
        [action.favourite]: false,
      };
    default:
      return state;
  }
};
