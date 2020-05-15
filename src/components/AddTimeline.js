import { format } from "date-fns";
import React, { useState, useContext, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  Icon,
  Grid,
  Checkbox,
  FormControlLabel,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SkillContext } from "../context/SkillContext";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { AlertContext } from "../context/AlertContext";
import { TimelineContext } from "../context/TimelineContext";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { backendUrl } from "../model/Backend.model";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "10px 0",
  },
  formControl: {
    minWidth: 300,
  },
  width: {
    width: "100%",
  },

  checkbox: {
    textAlign: "center",
  },
}));

const AddTimeline = ({ handleDialogClose, timeline }) => {
  const classes = useStyles();

  const [isPresent, setIsPresent] = useState(false);

  // useEffect( () => {
  //   if(timeline.)
  // },[])

  const formInitialState = () => {
    console.log(timeline);
    if (timeline) {
      let linkDisplay = {
        url: "",
        display: "",
      };

      if (timeline.hasOwnProperty("link")) {
        linkDisplay = {
          url: timeline.link.url,
          display: timeline.link.display,
        };
      }
      return {
        content: timeline.content,
        color: timeline.color,
        startDate: timeline.dateStart,
        endDate: timeline.dateEnd,
        backgroundColor: timeline.backgroundColor,
        iconBackground: timeline.iconBackground,
        iconColor: timeline.iconColor,
        icon: timeline.icon,
        title: timeline.title,
        tags: timeline.tags,
        subTitle: timeline.subTitle,
        link: linkDisplay,
        password: "",
      };
    } else {
      return {
        content: "",
        color: "",
        startDate: format(new Date(), "MM/dd/yyyy"),
        endDate: format(new Date(), "MM/dd/yyyy"),
        iconBackground: "",
        iconColor: "",
        backgroundColor: "",
        icon: "",
        title: "",
        tags: [],
        subTitle: "",
        link: {
          url: "",
          display: "",
        },
        password: "",
      };
    }
  };

  // const [timelineDate, setTimelineDate] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  // });

  const { timelines, dispatch } = useContext(TimelineContext);
  const { snackbarDispatch } = useContext(AlertContext);
  const [form, setForm] = useState(formInitialState);
  const [tag, setTag] = useState("");

  const handleSubmit = async (action) => {
    if (form.password !== "jarvilito") {
      handleDialogClose();
      snackbarDispatch({
        type: "OPEN_SNACKBAR",
        payload: {
          content: "Incorrect Password, try again",
          severity: "error",
        },
      });

      return;
    } else {
      let endDate = form.endDate;
      if (await isPresent) {
        endDate = "present";
      }
      const dateRange = `${form.startDate} - ${endDate}`;
      const formTimeline = await {
        dateStart: form.startDate,
        dateEnd: form.endDate,
        content: form.content,
        color: form.color,
        backgroundColor: form.backgroundColor,
        dateRange,
        iconBackground: form.iconBackground,
        iconColor: form.iconColor,
        icon: form.icon,
        title: form.title,
        subTitle: form.subTitle,
        tags: form.tags,
        link: form.link,
      };

      switch (action) {
        case "CREATE_TIMELINE":
          axios
            .post(`${backendUrl}/timelines/add`, formTimeline)
            .then((res) => {
              handleDialogClose();
              dispatch({
                type: "ADD_SUCCESS",
                payload: res.data,
              });

              snackbarDispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                  content: "Timeline Added Successfully",
                  severity: "success",
                },
              });
            })
            .catch((err) => {
              dispatch({
                type: "ADD_ERROR",
                payload: err,
              });
            });

          break;

        case "EDIT_TIMELINE":
          console.log(formTimeline);
          axios
            .post(
              `${backendUrl}/timelines/update/${timeline._id}`,
              formTimeline
            )
            .then((res) => {
              console.log(res);
              handleDialogClose();

              dispatch({
                type: "EDIT_SUCCESS",
                payload: res.data,
              });

              snackbarDispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                  content: "Skill Updated Successfully",
                  severity: "success",
                },
              });
            })
            .catch((err) => {
              dispatch({
                type: "ADD_ERROR",
                payload: err,
              });
            });
          break;
        default:
          break;
      }
    }
  };

  const handleStartDateChange = (date) => {
    const convertedDate = format(new Date(date), "MM/dd/yyyy");

    setForm({
      ...form,
      startDate: convertedDate,
    });
  };

  const handleEndDateChange = (date) => {
    const convertedDate = format(new Date(date), "MM/dd/yyyy");

    setForm({
      ...form,
      endDate: convertedDate,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    // if(e.target.name)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLink = (e) => {
    e.preventDefault();

    const link = { ...form.link, [e.target.name]: e.target.value };

    setForm({
      ...form,
      link,
    });
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleKeyPress = (e) => {
    const key = e.key;

    if (key === "Enter") {
      const tags = [...form.tags, e.target.value];
      setForm({
        ...form,
        tags,
      });

      setTag("");
    }
  };

  const handleIsPresentChange = () => {
    setIsPresent(!isPresent);
  };

  let tagRender;

  form.tags.length
    ? (tagRender = form.tags.map((tag) => {
        return (
          <Chip
            style={{ marginRight: "5px" }}
            label={tag}
            key={tag}
            color="primary"
          />
        );
      }))
    : (tagRender = "");
  return (
    <div>
      <DialogTitle>
        {timeline ? "Edit / Delete Timeline" : "Add New Timeline"}
      </DialogTitle>
      <DialogContent>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            name="title"
            value={form.title}
            onInput={handleChange}
            className={classes.form}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="subTitle"
            value={form.subTitle}
            onInput={handleChange}
            className={classes.form}
            id="outlined-basic"
            label="Subtitle"
            variant="outlined"
            fullWidth
          />

          <TextField
            name="content"
            value={form.content}
            onInput={handleChange}
            className={classes.form}
            id="outlined-basic"
            label="Timeline Content"
            variant="outlined"
            fullWidth
            multiline
            helperText="The body of your timeline. Ex. 'I work as a web developer'"
          />

          <TextField
            name="color"
            value={form.color}
            onInput={handleChange}
            className={classes.form}
            id="outlined-basic"
            label="Color"
            variant="outlined"
            fullWidth
            helperText="The color of the text you want to display."
          />

          <TextField
            name="backgroundColor"
            value={form.backgroundColor}
            onInput={handleChange}
            className={classes.form}
            id="outlined-basic"
            label="Background color"
            variant="outlined"
            fullWidth
            helperText="The background color of the timeline you want to display"
          />
          <TextField
            name="icon"
            value={form.icon}
            onInput={handleChange}
            className={classes.form}
            label="Icon"
            variant="outlined"
            fullWidth
            helperText="You can enter hexadecimal or color name."
          />

          <TextField
            name="iconBackground"
            value={form.iconBackground}
            onInput={handleChange}
            className={classes.form}
            id="outlined-basic"
            label="Icon Background Color"
            variant="outlined"
            fullWidth
            helperText="You can enter hexadecimal or color name."
          />

          <TextField
            name="iconColor"
            value={form.iconColor}
            onInput={handleChange}
            className={classes.form}
            label="Icon Color"
            variant="outlined"
            fullWidth
            helperText="You can enter hexadecimal or color name."
          />

          <TextField
            value={tag}
            onKeyPress={handleKeyPress}
            onChange={handleTagChange}
            className={classes.form}
            label="Tags"
            variant="outlined"
            fullWidth
            helperText="Press enter for another tag, for Mobile use the '+' button"
          />

          <TextField
            value={form.link.url}
            name="url"
            onChange={handleLink}
            className={classes.form}
            label="Link"
            variant="outlined"
            fullWidth
            helperText="Optional, insert your project link here"
          />

          <TextField
            value={form.link.display}
            name="display"
            onChange={handleLink}
            className={classes.form}
            label="Link Title"
            variant="outlined"
            fullWidth
            helperText="Title of the link you want to display"
          />

          <div>{tagRender}</div>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-between" alignItems="flex-end">
              <Grid item xs={12} sm={4}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date Started"
                  format="MM/dd/yyyy"
                  name="dateStart"
                  value={form.startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "Date Started",
                  }}
                  className={classes.width}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <KeyboardDatePicker
                  disabled={isPresent}
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date Ended"
                  format="MM/dd/yyyy"
                  name="dateStart"
                  value={form.endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  className={classes.width}
                />
              </Grid>
              <Grid item xs={12} sm={2} className={classes.checkbox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPresent}
                      onChange={handleIsPresentChange}
                      color="primary"
                    />
                  }
                  label="Present"
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

          <TextField
            name="password"
            value={form.password}
            onInput={handleChange}
            className={classes.form}
            id="outlined-basic"
            label="Password"
            type="password"
            color="secondary"
            variant="outlined"
            fullWidth
            helperText="You can only use this if you know the password"
          />
        </form>
      </DialogContent>
      <DialogActions>
        {timeline ? (
          <>
            <Button
              color="primary"
              startIcon={<EditIcon />}
              onClick={(e) => handleSubmit("EDIT_TIMELINE")}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={(e) => handleSubmit("DELETE_TIMELINE")}
            >
              Delete
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            startIcon={<SaveIcon />}
            onClick={(e) => handleSubmit("CREATE_TIMELINE")}
          >
            Add Timeline
          </Button>
        )}

        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddTimeline;
