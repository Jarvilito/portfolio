import React, { useEffect, useContext, useState } from "react";
import ReplyIcon from "@material-ui/icons/Reply";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReplyList from "./ReplyList";
import AddReply from "./AddReply";
import { AuthContext } from "../../../context/AuthContext";

import { ReplyContext } from "../../../context/ReplyContext";
import { backendUrl } from "../../../model/Backend.model";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "25px",
  },

  replyButton: {
    margin: "8px 0",
  },
}));
const Reply = ({ post }) => {
  const [checked, isChecked] = useState(false);

  const { user } = useContext(AuthContext);

  const classes = useStyles();

  const { replies, dispatch } = useContext(ReplyContext);

  const showReply = (e) => {
    e.preventDefault();
    isChecked(!checked);
  };

  useEffect(() => {
    axios.get(`${backendUrl}/reply`).then(async (data) => {
      const replies = data.data;


      dispatch({ type: "FETCH_SUCCESS", payload: replies });
    });
  }, []);

  return (
    <div className={classes.root}>
      <ReplyList post={post} replies={replies} />

      {Object.keys(user).length ? (
        <>
          <Button
            size="small"
            // variant="contained"
            color="primary"
            onClick={showReply}
            className={classes.replyButton}
            startIcon={<ReplyIcon />}
          >
            {checked ? "Hide Reply" : "Reply"}
          </Button>

          <AddReply checked={checked} post={post} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Reply;
