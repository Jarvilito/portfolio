import React from "react";
import {
  Container,
  Grid,
  Typography,
  Divider,
  Icon,
  Card,
  CardContent,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "react-reveal/Fade";
import { HobbyDetails } from "./HobbyDetails";
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
  },

  pos: {
    marginBottom: "20px",
  },
}));

export const Hobby = () => {
  const classes = useStyle();
  return (
    <div className={classes.root} id="hobby">
      <Grid container justify="center" className={classes.textCenter}>
        <Grid item>
          <Fade bottom>
            <Typography gutterBottom variant="button" className={classes.title}>
              My Hobbies
            </Typography>
          </Fade>
        </Grid>
      </Grid>
      <Divider />
      <Container maxWidth="md" style={{ marginTop: "50px" }}>
        <Grid container justify="center">
          <HobbyDetails />
        </Grid>
      </Container>
    </div>
  );
};
