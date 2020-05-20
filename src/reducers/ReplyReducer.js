export const replyReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return action.payload;
    case "FETCH_ERROR":
      return state;
    case "ADD_SUCCESS":
      return [action.payload, ...state];
    case "ADD_ERROR":
      return action.payload;
    case "EDIT_SUCCESS":
      // const updatedSkill = state.filter(
      //   (skill) => skill._id !== action.payload._id
      // );
      // return [...updatedSkill, action.payload];

      const updatedSkill = state.map((skill) => {
        if (skill._id === action.payload._id) {
          return action.payload;
        }

        return skill;
      });

      return updatedSkill;

    case "DELETE_SUCCESS":
      return state.filter((comment) => comment._id !== action.payload);
    default:
      return state;
  }
};
