import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { commentReducer } from "../reducers/CommentReducer";
import { backendUrl } from "../model/Backend.model";

export const CommentContext = createContext();

const CommentContextProvider = (props) => {
  const [comments, dispatch] = useReducer(commentReducer, []);

  //   useEffect(() => {
  //     axios
  //       .get(`${backendUrl}/comments`)
  //       .then((data) => {
  //         let items = data.data;
  //         dispatch({ type: "FETCH_SUCCESS", payload: items });
  //       })
  //       .catch((err) => {
  //         dispatch({ type: "FETCH_ERROR", payload: err });
  //       });
  //   }, []);

  return (
    <CommentContext.Provider value={{ comments, dispatch }}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
