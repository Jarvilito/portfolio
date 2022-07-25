import React, { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import Icon from "@material-ui/core/Icon";
import SendIcon from "@material-ui/icons/Send";
import Login from "../auth/Login";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { backendUrl } from "../../model/Backend.model";
import { AlertContext } from "../../context/AlertContext";
import { CommentContext } from "../../context/CommentContext";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "25px",
  },
  commentBox: {
    width: "100%",
  },
  buttonContainer: {
    textAlign: "right",
    marginTop: "10px",
  },
  button: {
    width: "100%",
    height: "50px",
  },
}));
const AddComment = ({ type, commentEdit }) => {
  const classes = useStyle();

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(CommentContext);
  const { snackbar, snackbarDispatch } = useContext(AlertContext);

  const initialState = {
    postedBy: "",
    image: "",
    date: format(new Date(), "MMMM dd yyyy"),
    content: "",
    userId: "",
  };

  const [comment, setComment] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();

    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.content) {
      setError("Comment Required");
      return;
    }

    if (type === "create") {
      axios
        .post(`${backendUrl}/comments/add`, comment)
        .then((res) => {
   

          dispatch({
            type: "ADD_SUCCESS",
            payload: res.data,
          });

          snackbarDispatch({
            type: "OPEN_SNACKBAR",
            payload: {
              content: `Comment Posted!, Thank you ${user.displayName} for your feedback`,
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
          setComment({ ...comment, content: "" });
          setError("");
        });
    } else {
      axios
        .post(`${backendUrl}/comments/update/${commentEdit._id}`, comment)
        .then((res) => {


          dispatch({
            type: "EDIT_SUCCESS",
            payload: res.data,
          });

          snackbarDispatch({
            type: "OPEN_SNACKBAR",
            payload: {
              content: `Comment Posted!, Thank you ${user.displayName} for your feedback`,
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
          setComment({ ...comment, content: "" });
          setError("");
        });
    }
  };

  useEffect(() => {
    setComment({
      ...comment,
      postedBy: user.displayName,
      image: user.picture,
      userId: user.id,
      content: type === "edit" ? commentEdit.content : "",
    });
  }, [type, user]);

  const commentComponent = (
    <>
      <TextField
        id="outlined-multiline-static"
        label="Write a comment"
        multiline
        error={!!error}
        rows={4}
        helperText={error}
        name="content"
        value={comment.content}
        onInput={handleChange}
        className={classes.commentBox}
        variant="outlined"
      />
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.button}
          endIcon={<SendIcon />}
        >
          {type === "create" ? "Post Comment" : "Update Comment"}
        </Button>
      </div>
    </>
  );

  const loginComponent = <Login type="comment" />;
  return (
    <div className={classes.root}>
      {Object.keys(user).length ? commentComponent : loginComponent}
    </div>
  );
};

export default AddComment;
