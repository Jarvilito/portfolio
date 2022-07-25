import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { backendUrl } from "../model/Backend.model";
import { AlertContext } from "./AlertContext";
import { authReducer } from "../reducers/AuthReducer";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, userDispatch] = useReducer(authReducer, "");

  const { snackbar, snackbarDispatch } = useContext(AlertContext);

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (!localUser) {
      axios
        .get(`${backendUrl}/user`)
        .then((userDetail) => {
          const userData = userDetail.data;
          if (Object.keys(userData).length) {
            userDispatch({ type: "FACEBOOK_LOGIN", payload: userData });
            localStorage.setItem("user", JSON.stringify(userData));

            snackbarDispatch({
              type: "OPEN_SNACKBAR",
              payload: {
                content: `Welcome to my portoflio ${
                  userData.provider === "github"
                    ? userData.name
                    : userData.displayName
                } ! Please enjoy your visit - JARVIS`,
                severity: "success",
              },
            });
          } else {
            return;
          }
        })
        .catch((err) => {
          snackbarDispatch({
            type: "OPEN_SNACKBAR",
            payload: {
              content: `Something Went Wrong : ${err}`,
              severity: "error",
            },
          });
        });
    } else {
      userDispatch({
        type: "SET_LOCAL_STORAGE_USER",
        payload: JSON.parse(localUser),
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, userDispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
