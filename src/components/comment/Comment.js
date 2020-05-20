import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ComponentTitle from "../ComponentTitle";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Divider,
  Avatar,
} from "@material-ui/core";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { backendUrl } from "../../model/Backend.model";
import { CommentContext } from "../../context/CommentContext";
import ShowAllComment from "./ShowAllComment";

const useStyle = makeStyles((theme) => ({
  root: {
    marginBottom: "50px",
  },
}));
const Comment = () => {
  const { comments, dispatch } = useContext(CommentContext);
  useEffect(() => {
    axios.get(`${backendUrl}/comments`).then((data) => {
      let commentsData = data.data;
      dispatch({ type: "FETCH_SUCCESS", payload: commentsData });
    });
  }, []);

  const [commentEditData, setCommentEditData] = useState({});

  const [type, setType] = useState("create");

  const handleEdit = (data) => {
    setType("edit");
    setCommentEditData(data);
  };

  const title = `Comments (${comments.length})`;
  const classes = useStyle();
  return (
    <div className={classes.root} id="comments">
      <ComponentTitle title={title} />
      <Container maxWidth="md">
        <AddComment type={type} commentEdit={commentEditData} />

        {comments.length ? (
          comments.map((comment) => (
            <CommentList
              key={comment._id}
              comment={comment}
              isEdit={handleEdit}
            />
          ))
        ) : (
          <Typography variant="body1" style={{ marginTop: "25px" }}>
            Looks like there is no comment yet, be the first one to comment!
          </Typography>
        )}

        {comments.length ? <ShowAllComment /> : ""}
      </Container>
    </div>
  );
};

export default Comment;
