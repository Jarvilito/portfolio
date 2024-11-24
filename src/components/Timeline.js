import React, { useEffect, useState, useContext } from "react";
import { Container, Grid, Typography, Divider, Icon, Box } from "@material-ui/core/";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "react-reveal/Fade";
import TimelineDetails from "./TimelineDetails";
import { TimelineContext } from "../context/TimelineContext";
import ComponentTitle from "./ComponentTitle";
import { Skeleton } from "@material-ui/lab";

const useStyle = makeStyles((theme) => ({
  root: {
    marginBottom: "50px",
  },
  textCenter: {
    textAlign: "center",
  },

  title: {
    fontSize: "40px",
    letterSpacing: "5px",
  },
  bg: {
    backgroundColor: "#e8f5e9",
    marginTop: "15px",
    padding: "20px",
  },
}));

export const Timeline = () => {
  const classes = useStyle();

  const { timelines } = useContext(TimelineContext);

  return (
    <div className={classes.root} id="timeline">
      
      <ComponentTitle title="Timeline" />
     { timelines.length ? (
      <Container maxWidth="lg">
      <VerticalTimeline className={classes.bg}>
        {timelines.length
          ? timelines.map((timeline) => {
              return (
                <TimelineDetails
                  key={timeline._id || 0}
                  timeline={timeline}
                ></TimelineDetails>
              );
            })
          : null}
      </VerticalTimeline>
    </Container>
     ) : (
      <Box
          style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // 3 items per row
          gap: '1rem', // Spacing between items
          margin: '2rem 5rem'
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
     )}


    </div>
  );
};
