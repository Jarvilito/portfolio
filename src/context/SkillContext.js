import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { skillReducer } from "../reducers/SkillReducer";
import { backendUrl } from "../model/Backend.model";

export const SkillContext = createContext();

const SkillContextProvider = (props) => {
  const [skills, dispatch] = useReducer(skillReducer, []);

  useEffect(() => {
    console.log("effect use");
    axios
      .get(`${backendUrl}/skills`)
      .then((data) => {
        let items = data.data;
        const sortedSkills = (item) => {
          return item.sort((a, b) => {
            if (a.rate < b.rate) {
              return 1;
            } else if (a.rate > b.rate) {
              return -1;
            }

            return 0;
          });
        };

        dispatch({ type: "FETCH_SUCCESS", payload: sortedSkills(items) });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: err });
      });
  }, []);

  return (
    <SkillContext.Provider value={{ skills, dispatch }}>
      {props.children}
    </SkillContext.Provider>
  );
};

export default SkillContextProvider;
