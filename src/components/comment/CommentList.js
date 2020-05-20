import React, { useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Badge,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import Reply from "./reply/Reply";
import ReplyIcon from "@material-ui/icons/Reply";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { backendUrl } from "../../model/Backend.model";
import { CommentContext } from "../../context/CommentContext";
import { AlertContext } from "../../context/AlertContext";
import { AuthContext } from "../../context/AuthContext";

const useStyle = makeStyles((theme) => ({
  container: {
    margin: "10px",
    padding: "5px",
  },

  listRoot: {
    width: "100%",
  },

  avatar: {
    width: "25",
    height: "25",
  },

  commentHeader: {
    display: "flex",
  },

  postedBy: {
    alignSelf: "center",
    marginLeft: "10px",
    fontWeight: "600",
    letterSpacing: "1px",
  },

  commentBody: {
    padding: "0px 10px 10px 10px",
  },
}));
const CommentList = ({ comment, isEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { dispatch } = useContext(CommentContext);
  const { snackbarDispatch } = useContext(AlertContext);

  const { user } = useContext(AuthContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`${backendUrl}/comments/${comment._id}`).then((data) => {
      dispatch({
        type: "DELETE_SUCCESS",
        payload: comment._id,
      });
      snackbarDispatch({
        type: "OPEN_SNACKBAR",
        payload: {
          content: "Comment Deleted!",
          severity: "warning",
        },
      });
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    isEdit(comment);
  };
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.commentHeader}>
        <List className={classes.listRoot}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt={comment.displayName}
                src={comment.image}
              />
            </ListItemAvatar>
            <ListItemText
              primary={comment.postedBy}
              secondary={`${comment.date}`}
            />

            {user.id === comment.userId ? (
              <ListItemSecondaryAction>
                <IconButton aria-label="Edit" onClick={handleClick}>
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
              </ListItemSecondaryAction>
            ) : (
              ""
            )}
          </ListItem>
        </List>
      </div>

      <div className={classes.commentBody}>
        <Typography variant="body2">{comment.content}</Typography>
      </div>

      <Reply post={comment} />

      <Divider variant="fullWidth" style={{ marginBottom: "5px" }} />
    </div>
  );
};

export default CommentList;
