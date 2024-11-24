import React, { useState } from "react";
import {
  Paper,
  CardContent,
  Typography,
  Grid,
  Icon,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "react-reveal/Fade";

const useStyle = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center",
  },

  pos: {
    marginTop: "50px",
  },
  title: {},
}));

const initialState = [
  {
    icon: "fas fa-basketball-ball",
    title: "Playing basketball",
  },
  {
    icon: "fas fa-code",
    title: "Developing | Programming | Coding",
  },
  {
    icon: "fab fa-steam",
    title: "Playing Dota 2",
  },
  {
    icon: "fas fa-dumbbell",
    title: "Working out at the gym",
  },
  {
    icon: "fas fa-vr-cardboard",
    title: "Watching movies | anime | documentation",
  },
  {
    icon: "fas fa-baseball-ball",
    title: "Tennis",
  },
  {
    icon: "fas fa-pencil-alt",
    title: "Drawing",
  },
  {
    icon: "fas fa-headphones",
    title: "Listening to music",
  },
  {
    icon: "fas fa-guitar",
    title: "Playing guitar",
  },
];
export const HobbyDetails = () => {
  const classes = useStyle();

  const [hobbies, setHobbies] = useState(initialState);

  return (
    <>
      {hobbies.map((hobby) => {
        return (
          <Grid item sm={4} xs={6} key={hobby.title}>
            <div className={classes.textCenter} style={{ marginTop: "50px" }}>
              <Fade left>
                <Icon
                  className={hobby.icon}
                  style={{
                    fontSize: "35px",
                    width: "100%",
                    marginBottom: "35px",
                  }}
                />
              </Fade>

              <br />
              <div style={{ padding: "15px" }}>
                <Typography variant="body1">{hobby.title}</Typography>
              </div>
            </div>
          </Grid>
        );
      })}
    </>
  );
};
