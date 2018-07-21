import React from 'react';

export const StoreContext = React.createContext({});

const MyProvider = (props) => {

  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default MyProvider;
