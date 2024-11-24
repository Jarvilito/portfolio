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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SkillContext } from "../context/SkillContext";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { AlertContext } from "../context/AlertContext";
import { backendUrl } from "../model/Backend.model";
const useStyles = makeStyles((theme) => ({
  form: {
    margin: "10px 0",
  },

  formControl: {
    minWidth: 150,
  },
}));

const AddSkills = ({ handleDialogClose, skill }) => {
  const classes = useStyles();
  const { dispatch } = useContext(SkillContext);
  const { snackbar, snackbarDispatch } = useContext(AlertContext);

  const formInitialState = () => {
    if (skill) {
      return {
        label: skill.label,
        icon: skill.icon,
        color: skill.color,
        rate: skill.rate,
        type: skill.type,
        password: "",
      };
    } else {
      return {
        label: "",
        icon: "",
        color: "",
        rate: "",
        type: "",
        password: "",
      };
    }
  };

  const [form, setForm] = useState(formInitialState);

  const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSubmit = (action) => {
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
      const formSkill = {
        label: form.label,
        icon: form.icon,
        color: form.color,
        rate: form.rate,
        type: form.type,
      };

      switch (action) {
        case "CREATE_SKILL":
          axios
            .post(`${backendUrl}/skills/add`, formSkill)
            .then((res) => {
              handleDialogClose();
              dispatch({
                type: "ADD_SUCCESS",
                payload: res.data,
              });

              snackbarDispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                  content: "Skill Added Successfully",
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
        case "EDIT_SKILL":
          axios
            .post(`${backendUrl}/skills/update/${skill._id}`, formSkill)
            .then((res) => {

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
            });
          break;

        case "DELETE_SKILL":
          axios.delete(`${backendUrl}/skills/${skill._id}`).then((res) => {
            handleDialogClose();

            dispatch({
              type: "DELETE_SUCCESS",
              payload: skill._id,
            });

            snackbarDispatch({
              type: "OPEN_SNACKBAR",
              payload: {
                content: "Skill Deleted!",
                severity: "warning",
              },
            });
          });

          break;
        default:
          return;
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };
  return (
    <>
      <DialogTitle>
        {skill ? "Edit / Delete Skill" : "Add New Skill"}
      </DialogTitle>
      <DialogContent>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            name="label"
            value={form.label}
            onInput={handleChange}
            className={classes.form}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="icon"
            value={form.icon}
            onInput={handleChange}
            className={classes.form}
            id="outlined-basic"
            label="Icon"
            variant="outlined"
            fullWidth
            helperText="Only use font awesome class."
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
            helperText="You can enter hexadecimal or color name."
          />
          <FormControl className={`${classes.form} ${classes.formControl}`}>
            <InputLabel>Rating</InputLabel>
            <Select name="rate" value={form.rate} onChange={handleChange}>
              {rating.map((rate) => {
                return (
                  <MenuItem value={rate} key={rate}>
                    {rate}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl className={`${classes.form} ${classes.formControl}`}>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={form.type} onChange={handleChange}>
              <MenuItem value="language">Language</MenuItem>
              <MenuItem value="framework">Framework</MenuItem>
            </Select>
          </FormControl>
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
        {skill ? (
          <>
            <Button
              color="primary"
              startIcon={<EditIcon />}
              onClick={(e) => handleSubmit("EDIT_SKILL")}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={(e) => handleSubmit("DELETE_SKILL")}
            >
              Delete
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            startIcon={<SaveIcon />}
            onClick={(e) => handleSubmit("CREATE_SKILL")}
          >
            Add Skill
          </Button>
        )}

        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default AddSkills;
