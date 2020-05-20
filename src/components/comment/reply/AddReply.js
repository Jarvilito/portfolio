import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { Collapse, TextField, Button } from "@material-ui/core/";
import ReplyIcon from "@material-ui/icons/Reply";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../../context/AuthContext";
import { backendUrl } from "../../../model/Backend.model";
import axios from "axios";
import { AlertContext } from "../../../context/AlertContext";
import { ReplyContext } from "../../../context/ReplyContext";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  commentBox: {
    width: "100%",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },

  button: {
    margin: "10px 0",
  },
}));
const AddReply = ({ checked, post }) => {
  const { user } = useContext(AuthContext);

  const { snackbar, snackbarDispatch } = useContext(AlertContext);

  const { dispatch } = useContext(ReplyContext);

  useEffect(() => {
    setReply({
      ...reply,
      replyBy: user.displayName,
      image: user.picture,
      userId: user.id,
      postId: post._id,
    });
  }, [user]);

  const classes = useStyle();

  const [error, setError] = useState("");

  const [reply, setReply] = useState({
    replyBy: "",
    image: "",
    date: format(new Date(), "MMMM dd yyyy"),
    content: "",
    userId: "",
    postId: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    setReply({ ...reply, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reply.content) {
      setError("Reply Required");
      return;
    }

    axios
      .post(`${backendUrl}/reply/add`, reply)
      .then((res) => {
        // console.log(res.data);

        dispatch({
          type: "ADD_SUCCESS",
          payload: res.data,
        });

        snackbarDispatch({
          type: "OPEN_SNACKBAR",
          payload: {
            content: `Reply Posted!`,
            severity: "success",
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_ERROR",
          payload: err,
        });

        snackbarDispatch({
          type: "OPEN_SNACKBAR",
          payload: {
            content: `Something Went Wrong: Error ${err}, Please try again later`,
            severity: "error",
          },
        });
      })
      .finally(() => {
        setReply({ ...reply, content: "" });
        setError("");
      });
  };
  return (
    <div className={classes.root}>
      <Collapse in={checked}>
        <TextField
          id="outlined-multiline-static"
          label="Write a reply"
          multiline
          error={!!error}
          rows={4}
          helperText={error}
          name="content"
          value={reply.content}
          onInput={handleChange}
          className={classes.commentBox}
          variant="outlined"
        />
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            onClick={handleSubmit}
            variant="contained"
            className={classes.button}
            endIcon={<ReplyIcon />}
          >
            Submit Reply
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

export default AddReply;
