import {
  GET_CATEGORY,
  SET_SELECTED_OPTION,
  GET_USER_DATA,
  SET_FORM_DATA,
  SET_INSPECTION_STATE,
  GET_CATEGORY_BY_ID,
  GET_ALL_USERS,
  SET_ADMIN_OPTION,
} from "./actions-types";

const initialState = {
  categories: [],
  category: [],
  selectedOption: "personalData",
  selectedAdminOption: "manageUsers",
  userData: {},
  inspectionState: "form",
  formData: {
    companyName: "",
    autorizationNumber: "",
    fullname: "",
    companyAddress: "",
    identity: "",
    inspectionDate: "",
    inspectionTime: "",
    cellphone: "",
    email: "",
    form: {},
    inspectorSign1: "",
    inspectorSign2: "",
    ownerSign: "",
    days: "",
  },
  users: [],
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

    case SET_ADMIN_OPTION:
      return {
        ...state,
        selectedAdminOption: payload,
      };

    case GET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };

    case SET_FORM_DATA:
      return {
        ...state,
        formData: payload,
      };

    case SET_INSPECTION_STATE:
      return {
        ...state,
        inspectionState: payload,
      };

    case GET_CATEGORY_BY_ID:
      return {
        ...state,
        category: payload,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
