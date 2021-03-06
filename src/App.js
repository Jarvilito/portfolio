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
import AuthContextProvider from "./context/AuthContext";
import CommentContextProvider from "./context/CommentContext";
import ReplyContextProvider from "./context/ReplyContext";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'Quicksand',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <AlertContextProvider>
        <AuthContextProvider>
          <GlobalContextProvider>
            <SkillContextProvider>
              <CommentContextProvider>
                <ReplyContextProvider>
                  <TimelineContextProvider>
                    <Alerts />
                    <OpenSpeedDial />
                    <Navbar />
                  </TimelineContextProvider>
                </ReplyContextProvider>
              </CommentContextProvider>
            </SkillContextProvider>
          </GlobalContextProvider>
        </AuthContextProvider>
      </AlertContextProvider>
    </Router>
    </ThemeProvider>
  );
}

export default App;
