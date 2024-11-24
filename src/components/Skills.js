import React, { useEffect, useContext, useState } from "react";
import { Container, Grid, Typography, Divider, Box } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Fade from "react-reveal/Fade";
import Icon from "@material-ui/core/Icon";
import { loadCSS } from "fg-loadcss";
import { SkillContext } from "../context/SkillContext";
import SkillDetails from "./SkillDetails";
import { AlertContext } from "../context/AlertContext";
import ComponentTitle from "./ComponentTitle";
import { Skeleton } from "@material-ui/lab";

const useStyle = makeStyles((theme) => ({
  root: {
    marginBottom: "50px",
  },
  title: {
    fontSize: "40px",
    letterSpacing: "5px",
  },
  textCenter: {
    textAlign: "center",
    wordWrap: "break-word",
  },

  progressBar: {
    width: "70px",
    height: "70px",
    display: "block",
    margin: "0 auto",
  },

  margin: {
    paddingBottom: "20px",
  },

  skillContent: {
    padding: "20px 10px",
  },

  skillLabel: {
    fontSize: "1em",
    letterSpacing: "0.3em",
    wordWrap: "break-word",
  },

  frameworkLabel: {
    fontSize: "0.4em",
    letterSpacing: "0.1em",
  },

  secondaryText: {
    fontSize: "1.5em",
    letterSpacing: "0.3em",
  },
}));
const Skills = () => {
  const { skills } = useContext(SkillContext);

  const { snackbar, snackbarDispatch } = useContext(AlertContext);

  const classes = useStyle();

  const languages = skills.length
    ? skills.filter((skill) => skill.type === "language" && skill.rate >= 5)
    : [];

  const frameworks = skills.length
    ? skills.filter((skill) => skill.type === "framework" && skill.rate >= 5)
    : [];

  const progressColor = (rate) => {
    if (rate === 10) {
      return "#7b1fa2";
    } else if (rate >= 7) {
      return "#1e88e5";
    } else if (rate > 4) {
      return "#81c784";
    } else {
      return "#c62828";
    }
  };

  useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);
  return (
    <div className={classes.root} id="skills">
      <ComponentTitle title="My Skills" />
      <Container maxWidth="md">
        <div className={classes.textCenter} style={{ marginTop: "10px" }}>
          <Typography
            gutterBottom
            variant="button"
            className={classes.skillLabel}
          >
            Programming Languages
          </Typography>
        </div>

        <Fade left>

          { !languages.length ? (
            <Box
            style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // 3 items per row
            gap: '1.5rem', // Spacing between items
            marginTop: '2rem'
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                sx={{ bgcolor: 'grey.1200' }}
                width={'100%'}
                height={118}
                animation="wave"
              />
            ))}
          </Box>
          )
        
          : (

            <Grid container className={classes.margin} justify="center">
              {languages.map((skill) => {
                return (
                  <SkillDetails
                    key={skill._id}
                    skill={skill}
                    progressColor={progressColor}
                  />
                );
              })}
            </Grid>
          )}
          
        
        </Fade>
        <Divider variant="middle" />
      </Container>
      <Container maxWidth="sm">
        <div className={classes.textCenter} style={{ marginTop: "10px" }}>
          <Typography
            gutterBottom
            variant="button"
            className={classes.skillLabel}
          >
            Frameworks/Libraries
          </Typography>
        </div>
        { !frameworks.length ? (
        <Box
          style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 items per row
          gap: '1.5rem', // Spacing between items
          marginTop: '2rem'
          }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                sx={{ bgcolor: 'grey.1200' }}
                width={'100%'}
                height={118}
                animation="wave"
              />
            ))}
        </Box>
        ) : (

          <Grid container className={classes.margin} justify="center">
            {frameworks.map((framework) => {
              return (
                <SkillDetails
                  key={framework._id}
                  skill={framework}
                  progressColor={progressColor}
                />
              );
            })}
          </Grid>
        )}


      </Container>
    </div>
  );
};

export default Skills;
