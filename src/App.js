import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import ExercisesList from "./components/exercises-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import { Timeline } from "./components/Timeline";
import OpenSpeedDial from "./components/OpenSpeedDial";
import SkillContextProvider from "./context/SkillContext";
import AlertContextProvider from "./context/AlertContext";
import Alerts from "./components/Alerts";
import TimelineContextProvider from "./context/TimelineContext";
import GlobalContextProvider from "./context/GlobalContext";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <GlobalContextProvider>
        <AlertContextProvider>
          <SkillContextProvider>
            <TimelineContextProvider>
              <Alerts />
              <OpenSpeedDial />
              <Navbar />
            </TimelineContextProvider>
          </SkillContextProvider>
        </AlertContextProvider>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
