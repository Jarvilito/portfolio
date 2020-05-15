import React, { useContext } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { AlertContext } from "../context/AlertContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Alerts = () => {
  const { snackbar, snackbarDispatch } = useContext(AlertContext);
  return (
    <div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => snackbarDispatch({ type: "CLOSE_SNACKBAR" })}
      >
        <Alert
          onClose={() => snackbarDispatch({ type: "CLOSE_SNACKBAR" })}
          severity={snackbar.severity}
        >
          {snackbar.content}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Alerts;
