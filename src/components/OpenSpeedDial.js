import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import { AuthContext } from "../context/AuthContext";
import EditIcon from "@material-ui/icons/Edit";
import { Dialog, DialogActions, IconButton, Tooltip } from "@material-ui/core";
import AddSkills from "./AddSkills";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AddTimeline from "./AddTimeline";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollIntoView from "react-scroll-into-view";

import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

const useStyles = makeStyles((theme) => ({
  speedDialMobile: {
    position: "fixed",
    bottom: 40,
    right: 10,
    zIndex: 9999,
  },

  speedDialDesktop: {
    position: "fixed",
    bottom: 30,
    right: 0,
    zIndex: 9999,
  },

  iconButton: {
    fontSize: "40px",
  },

  // backtoTop: {
  //   bottom: 30,
  //   position: "fixed",
  // },
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Add Skills", dialog: "skills" },
  { icon: <SaveIcon />, name: "Add Timeline", dialog: "timeline" },
];

export default function OpenIconSpeedDial() {
  const { user, userDispatch } = useContext(AuthContext);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = (dialog) => {
    setForm(dialog);
    setDialogOpen(true);
  };

  const speedDialPosition = () => {};

  const checkIfOnTop = () => {
    if (window.scrollY === 0) {
      console.log("im at top");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const SpeedDialShow = () => {
    const isMobile = fullScreen;
    if (!isMobile) {
      return (
        <div className={classes.speedDial}>
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="up"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleDialogOpen(action.dialog)}
              />
            ))}
          </SpeedDial>
          <div style={{ margin: "10px" }}>
            <Tooltip
              title="Back To Top"
              aria-label="back to top"
              arrow
              placement="left"
            >
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={scrollToTop}
              >
                <KeyboardArrowUpIcon className={classes.iconButton} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        fullWidth
        onClose={handleDialogClose}
        fullScreen={fullScreen}
        aria-labelledby="form-dialog-title"
      >
        {form === "skills" ? (
          <AddSkills handleDialogClose={handleDialogClose}></AddSkills>
        ) : (
          <AddTimeline handleDialogClose={handleDialogClose}></AddTimeline>
        )}
      </Dialog>
      <div
        className={
          !fullScreen ? classes.speedDialMobile : classes.speedDialDesktop
        }
      >
        {user.isAdmin ? (
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            hidden={fullScreen}
            direction="up"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleDialogOpen(action.dialog)}
              />
            ))}
          </SpeedDial>
        ) : (
          ""
        )}
        <div style={{ margin: "10px" }}>
          <Tooltip
            title="Back To Top"
            aria-label="back to top"
            arrow
            placement="left"
          >
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={scrollToTop}
            >
              <KeyboardArrowUpIcon className={classes.iconButton} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {/* <SpeedDialShow /> */}
    </div>
  );
}
