import {
  GET_CATEGORY,
  SET_SELECTED_OPTION,
  GET_USER_DATA,
} from "./actions-types";

const initialState = {
  categories: [],
  selectedOption: "personalData",
  userData: {},
};
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: payload,
      };

    case SET_SELECTED_OPTION:
      return {
        ...state,
        selectedOption: payload,
      };

    case GET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
