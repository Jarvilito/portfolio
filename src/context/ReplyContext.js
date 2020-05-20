import React, { createContext, useReducer } from "react";
import { replyReducer } from "../reducers/ReplyReducer";

export const ReplyContext = createContext();

const ReplyContextProvider = (props) => {
  const [replies, dispatch] = useReducer(replyReducer, []);

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
    <ReplyContext.Provider value={{ replies, dispatch }}>
      {props.children}
    </ReplyContext.Provider>
  );
};

export default ReplyContextProvider;
