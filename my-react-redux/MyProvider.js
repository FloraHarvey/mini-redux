import React from 'react';

export const StoreContext = React.createContext({});

const MyProvider = (props) => {
  // Makes the Redux store available to the connect() function via props by
   // making it a consuming component of the StoreContext

  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default MyProvider;
