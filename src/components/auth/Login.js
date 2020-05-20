import React, { useState, useContext, useEffect } from "react";
import { Button, Dialog, Grow, Avatar, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginList from "./LoginList";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { backendUrl } from "../../model/Backend.model";
import { AlertContext } from "../../context/AlertContext";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    color: "#f0efed",
    fontWeight: "600",
  },

  menuPadding: {
    marginLeft: "28px",
    marginTop: "10px",
    color: "#212121",
    fontWeight: "600",
  },

  avatar: {
    height: "50px",
    width: "50px",
    // padding: theme.spacing(3),
    margin: "20px",
  },
  button: {
    width: "100%",
    height: "50px",
  },
}));

const Login = ({ type }) => {
  const matches = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, userDispatch } = useContext(AuthContext);

  const { snackbar, snackbarDispatch } = useContext(AlertContext);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("development only");
    } else {
      console.log("production");
    }
  }, []);

  const handleLogin = (e) => {
    if (Object.keys(user).length) {
      userDispatch({ type: "LOGOUT" });
      snackbarDispatch({
        type: "OPEN_SNACKBAR",
        payload: {
          content: `Log out success, please come again - JARVIS`,
          serverity: "success",
        },
      });
    } else {
      setDialogOpen(!dialogOpen);
    }
  };

  return (
    <div>
      {type !== "comment" ? (
        <Button
          className={matches ? classes.menuPadding : classes.padding}
          onClick={handleLogin}
        >
          {Object.keys(user).length ? "Logout" : "Login"}
        </Button>
      ) : (
        <Button
          onClick={handleLogin}
          variant="outlined"
          color="primary"
          className={classes.button}
          endIcon={<RateReviewIcon />}
        >
          Write A Comment/Reply Here!
        </Button>
      )}

      <Dialog
        fullScreen={matches}
        TransitionComponent={Transition}
        open={dialogOpen}
        onClose={() => setDialogOpen(!dialogOpen)}
        fullWidth
        maxWidth="xs"
      >
        <LoginList />
      </Dialog>
    </div>
  );
};

export default Login;
