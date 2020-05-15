import React, { createContext, useReducer } from "react";
import { snackbarReducer } from "../reducers/SnackbarReducer";
export const AlertContext = createContext();

const snackbarInitialState = {
  open: false,
  content: "",
};
const AlertContextProvider = (props) => {
  const [snackbar, snackbarDispatch] = useReducer(
    snackbarReducer,
    snackbarInitialState
  );
  return (
    <div>
      <AlertContext.Provider value={{ snackbar, snackbarDispatch }}>
        {props.children}
      </AlertContext.Provider>
    </div>
  );
};

export default AlertContextProvider;
