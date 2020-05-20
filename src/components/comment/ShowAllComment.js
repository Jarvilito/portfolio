import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import axios from "axios";
import { CommentContext } from "../../context/CommentContext";
import { backendUrl } from "../../model/Backend.model";
import { AlertContext } from "../../context/AlertContext";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "25px",
  },
  button: {
    width: "100%",
    height: "50px",
  },
}));

const ShowAllComment = () => {
  const [isCommentAll, setIsCommentAll] = useState(false);
  const { dispatch } = useContext(CommentContext);
  const { snackbar, snackbarDispatch } = useContext(AlertContext);
  const classes = useStyle();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isCommentAll) {
      axios
        .get(`${backendUrl}/comments/all`)
        .then((res) => {
          dispatch({
            type: "FETCH_ALL",
            payload: res.data,
          });

          setIsCommentAll(true);
        })
        .catch((err) => {
          snackbarDispatch({
            type: "OPEN_SNACKBAR",
            payload: {
              content: `Something Went Wrong! Error Detail: ${err}`,
              severity: "error",
            },
          });
        });
    } else {
      axios
        .get(`${backendUrl}/comments`)
        .then((res) => {
          dispatch({
            type: "FETCH_SUCCESS",
            payload: res.data,
          });

          setIsCommentAll(false);
        })
        .catch((err) => {
          snackbarDispatch({
            type: "OPEN_SNACKBAR",
            payload: {
              content: `Something Went Wrong! Error Detail: ${err}`,
              severity: "error",
            },
          });
        });
    }
  };
  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
        className={classes.button}
        endIcon={<FormatListNumberedIcon />}
      >
        {isCommentAll ? "Show last 5 comments" : "Show all comments"}
      </Button>
    </div>
  );
};

export default ShowAllComment;
