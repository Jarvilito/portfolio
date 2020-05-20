import React, { useState } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import { authOptions } from "../../model/AuthOptions.model";
import Button from "@material-ui/core/Button";
import { DialogContent, DialogTitle, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px auto",
    padding: "10px 0",

    width: "100%",
    maxWidth: "250px",
    color: "white",
  },
  dialogContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "25px",
  },
  title: {
    margin: "10px auto",
  },
}));

const LoginList = () => {
  const classes = useStyles();
  const [options, setOptions] = useState(authOptions);

  return (
    <div>
      <DialogTitle id="simple-dialog-title" style={{ textAlign: "center" }}>
        Sign In
      </DialogTitle>
      <DialogContent className={classes.dialogContainer}>
        <Typography variant="body1" className={classes.title}>
          Choose your preferred sign in option
        </Typography>
        {options.map((option) => {
          return (
            <Button
              variant="contained"
              style={{ backgroundColor: option.color }}
              className={classes.button}
              startIcon={<option.icon />}
              key={option.label}
              onClick={() => (window.location = option.url)}
            >
              Sign in with {option.label}
            </Button>
          );
        })}
      </DialogContent>
    </div>
  );
};

export default LoginList;
