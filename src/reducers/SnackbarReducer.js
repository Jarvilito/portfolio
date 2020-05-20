export const snackbarReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_SNACKBAR":
      return {
        open: true,
        content: action.payload.content,
        severity: action.payload.severity,
      };

    case "CLOSE_SNACKBAR":
      return {
        open: false,
        content: state.content,
        severity: state.severity,
      };
    default:
      return state;
  }
};
