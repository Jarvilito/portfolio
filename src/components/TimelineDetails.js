import React, { useState, useContext, useEffect } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import WorkIcon from "@material-ui/icons/Work";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogActions, Link } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AddTimeline from "./AddTimeline";
import Chip from "@material-ui/core/Chip";
import LinkIcon from "@material-ui/icons/Link";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  textToUpperCase: {
    textTransform: "capitalize",
  },
  title: {
    wordWrap: "break-word",
  },
}));

const formattedText = (content) => content?.replace(/\n/g, "<br>");

const TimelineDetails = ({ timeline }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleForm = () => {
    if (user.isAdmin) {
      setDialogOpen(true);
    }
  };

  if (!timeline.color) {
    return null;
  }
  return (
    <>
      <Dialog
        open={dialogOpen}
        fullWidth
        onClose={() => setDialogOpen(false)}
        fullScreen={fullScreen}
        aria-labelledby="form-dialog-title"
      >
        <AddTimeline
          handleDialogClose={() => setDialogOpen(false)}
          timeline={timeline}
        />
      </Dialog>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{
          background: timeline.backgroundColor,
          color: timeline.color,
        }}
        contentArrowStyle={{
          borderRight: "7px solid " + timeline.backgroundColor,
        }}
        date={timeline.dateRange}
        iconStyle={{
          background: timeline.iconBackground,
          color: timeline.iconColor,
        }}
        icon={<WorkIcon />}
      >
        <div className={classes.title}>
          <h3
            onClick={handleForm}
            className={`${classes.textToUpperCase} "vertical-timeline-element-title"`}
          >
            {timeline.title}
          </h3>
        </div>
        <h4
          className={`${classes.textToUpperCase} "vertical-timeline-element-subtitle"`}
        >
          {timeline.subTitle}
        </h4>
        <div>
          {timeline.tags.map((tag) => {
            return (
              <Chip
                style={{ marginRight: "5px" }}
                label={tag}
                key={tag}
                color="primary"
                size="small"
              />
            );
          })}
        </div>
        <p dangerouslySetInnerHTML={{ __html: formattedText(timeline.content) }} />
        <div>
          {timeline.link.display ? (
            <Link href={timeline.link.url} target="_blank" rel="noreferrer">
              {timeline.link.display} <LinkIcon />
            </Link>
          ) : (
            ""
          )}
        </div>
      </VerticalTimelineElement>
    </>
  );
};

export default TimelineDetails;
