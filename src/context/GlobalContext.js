import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [backendUrl, setbackendUrl] = useState(
    "https://jarvis-portfolio.herokuapp.com"
  );

  return (
    <GlobalContext.Provider value={{ backendUrl }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
