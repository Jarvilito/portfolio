import React, { useState } from "react";
import { Grid, Icon, Typography } from "@material-ui/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogActions } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AddSkills from "./AddSkills";

const useStyle = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center",
    wordWrap: "break-word",
  },

  skillLabel: {
    fontSize: "1em",
    letterSpacing: "0.1em",
  },

  progressBar: {
    width: "70px",
    height: "70px",
    display: "block",
    margin: "0 auto",
  },

  skillContent: {
    padding: "20px 10px",
  },
}));

const SkillDetails = ({ skill, progressColor }) => {
  const classes = useStyle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [dialogOpen, setDialogOpen] = useState(false);

  const openSkillDetails = () => {
    // console.log('')
    // setDialogOpen(true);
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        fullWidth
        onClose={() => setDialogOpen(false)}
        fullScreen={fullScreen}
        aria-labelledby="form-dialog-title"
      >
        <AddSkills
          handleDialogClose={() => setDialogOpen(false)}
          skill={skill}
        />
      </Dialog>
      <Grid
        onClick={openSkillDetails}
        item
        xs={6}
        sm={4}
        md={3}
        className={classes.skillContent}
      >
        <div className={classes.textCenter}>
          <Icon
            className={skill.icon}
            color="primary"
            style={{
              color: skill.color,
              fontSize: "80px",
              width: "100%",
            }}
          />
        </div>
        <div className={classes.textCenter}>
          <Typography
            variant="button"
            display="block"
            className={classes.skillLabel}
          >
            {skill.label}
          </Typography>
        </div>
        <div className={classes.progressBar}>
          <CircularProgressbar
            value={skill.rate}
            maxValue={10}
            text={skill.rate}
            styles={buildStyles({
              strokeLinecap: "butt",
              textSize: "30px",
              pathTransitionDuration: 3,
              pathColor: progressColor(skill.rate),
              textColor: progressColor(skill.rate),
            })}
          />
        </div>
      </Grid>
    </>
  );
};

export default SkillDetails;
