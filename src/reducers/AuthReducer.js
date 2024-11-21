export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOCAL_STORAGE_USER":
      return {
        ...action.payload,
        isAdmin: (action.payload.id === "111421477585612615514" && action.payload.displayName === 'Jarvis') ? true : false,
      };
    case "FACEBOOK_LOGIN":
      return {
        ...state,
        ...action.payload,
        isAdmin: (action.payload.id === "111421477585612615514" && action.payload.displayName === 'Jarvis')  ? true : false,
      };

    case "LOGOUT":
      localStorage.removeItem("user");
      return {};
    default:
      return state;
  }
};
