import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { timelineReducer } from "../reducers/TimelineReducer";
import { backendUrl } from "../model/Backend.model";
export const TimelineContext = createContext();

const initialState = [
  {
    background: "",
    color: "",
    date: "",
    iconBackground: "",
    iconColor: "",
    icon: "",
    title: "",
    subtitle: "",
    content: "",
  },
];

const TimelineContextProvider = (props) => {
  useEffect(() => {
    axios
      .get(`${backendUrl}/timelines`)
      .then((data) => {
        const timelines = data.data;

        dispatch({ type: "FETCH_SUCCESS", payload: timelines });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: err });
      });
  }, []);
  const [timelines, dispatch] = useReducer(timelineReducer, initialState);
  return (
    <TimelineContext.Provider value={{ timelines, dispatch }}>
      {props.children}
    </TimelineContext.Provider>
  );
};

export default TimelineContextProvider;
