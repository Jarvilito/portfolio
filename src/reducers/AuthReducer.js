export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOCAL_STORAGE_USER":
      return {
        ...action.payload,
        isAdmin: action.payload.id === "10213404945397310" ? true : false,
      };
    case "FACEBOOK_LOGIN":
      return {
        ...state,
        ...action.payload,
        isAdmin: action.payload.id === "10213404945397310" ? true : false,
      };

    case "LOGOUT":
      localStorage.removeItem("user");
      return {};
    default:
      return state;
  }
};
