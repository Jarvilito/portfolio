import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "react-reveal/Fade";

const useStyle = makeStyles((theme) => ({
  title: {
    fontSize: "40px",
    letterSpacing: "5px",
  },

  gridContainer: {
    textAlign: "center",
    wordWrap: "break-word",
  },
}));
const ComponentTitle = ({ title }) => {
  const classes = useStyle();
  return (
    <>
      <Grid container justify="center" className={classes.textCenter}>
        <Grid item>
          <Fade bottom>
            <Typography gutterBottom variant="button" className={classes.title}>
              {title}
            </Typography>
          </Fade>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default ComponentTitle;
