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

        const sortedTimeline = timelines.sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart));

        dispatch({ type: "FETCH_SUCCESS", payload: sortedTimeline });
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
