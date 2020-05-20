import React, { useEffect, useContext } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MailIcon from "@material-ui/icons/Mail";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ListItemSecondaryAction,
  Badge,
  Divider,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { backendUrl } from "../../../model/Backend.model";
import { ReplyContext } from "../../../context/ReplyContext";
import { AlertContext } from "../../../context/AlertContext";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "5px",
  },
  commentBody: {
    padding: "0px 10px 10px 10px",
  },
  removeShadow: {
    boxShadow: "none",
    borderLeft: "0.5px solid #bdbdbd",
  },
  expantionDetails: {
    backgroundColor: "#fafafa",
    margin: "0 15px",
    // borderLeft: "0.5px solid #bdbdbd",
  },

  expansionSummary: {
    marginLeft: "15px",
    fontSize: "10px",
    color: "#311b92",
    fontWeight: "600",
    letterSpacing: "1px",
  },

  replyButton: {
    margin: "8px 0",
  },
  avatar: {
    width: "25",
    height: "25",
  },

  deleteICon: {
    color: "#b71c1c",
    fontSize: "1.1em",
  },
}));
const ReplyList = ({ post, replies }) => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(ReplyContext);

  const { snackbarDispatch } = useContext(AlertContext);

  const getSelectedReplies = replies.filter(
    (reply) => reply.postId === post._id
  );

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`${backendUrl}/reply/${id}`).then((data) => {
      dispatch({
        type: "DELETE_SUCCESS",
        payload: id,
      });

      snackbarDispatch({
        type: "OPEN_SNACKBAR",
        payload: {
          content: "Reply Deleted!",
          severity: "warning",
        },
      });
    });
  };

  return (
    <div>
      {getSelectedReplies.length ? (
        <>
          <ExpansionPanel className={classes.removeShadow} square>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Badge badgeContent={getSelectedReplies.length} color="primary">
                <ReplyAllIcon />
              </Badge>
              <Typography variant="button" className={classes.expansionSummary}>
                View All Replies
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expantionDetails}>
              <List style={{ width: "100%" }}>
                {getSelectedReplies.map((reply) => {
                  return (
                    <div key={reply._id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            className={classes.avatar}
                            alt={reply.replyBy}
                            src={reply.image}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={reply.replyBy}
                          secondary={reply.date}
                        />
                        {user.id === reply.userId ? (
                          <ListItemSecondaryAction>
                            <IconButton
                              aria-label="Delete"
                              onClick={(e) => handleDelete(reply._id)}
                            >
                              <DeleteForeverIcon
                                className={classes.deleteICon}
                              />
                            </IconButton>
                          </ListItemSecondaryAction>
                        ) : (
                          ""
                        )}
                      </ListItem>

                      <ListItem>
                        <div className={classes.commentBody}>
                          <Typography variant="body2">
                            {reply.content}
                          </Typography>
                        </div>
                      </ListItem>
                    </div>
                  );
                })}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReplyList;
