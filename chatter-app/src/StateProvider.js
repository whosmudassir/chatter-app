import React, { createContext, useContext, useReducer } from "react";
//preparing the data layer
export const StateContext = createContext();
//stateprovider is called higher order component- has 3 states
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pulling info from data layer
export const useStateValue = () => useContext(StateContext);
