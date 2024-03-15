import {
  GET_CATEGORY,
  SET_SELECTED_OPTION,
  GET_USER_DATA,
  SET_FORM_DATA,
  SET_INSPECTION_STATE,
  GET_CATEGORY_BY_ID,
  GET_ALL_USERS,
  SET_ADMIN_OPTION,
  UPDATE_CURRENT_PAGE,
  UPDATE_TOTAL_PAGES,
  GET_USER_INSPECTIONS,
  FILTER_INSPECTIONS,
  HANDLE_FILTERS,
  RESET_FILTERS,
  SET_SEARCHED_INPUT,
  GET_INSPECTION_BY_ID,
  SET_DATE,
  SET_PDF_DATA,
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
    categoryId: null,
  },
  users: [],
  inspections: {},
  inspectionDetail: {},
  totalInpections: "",
  searchInput: "",
  date: "",
  filteredInspections: {},
  submitFilters: {},
  currentPage: null,
  totalPages: null,
  pdfData: {
    companyName: "",
    autorizationNumber: "",
    fullname: "",
    companyAddress: "",
    identity: "",
    inspectionDate: "",
    inspectionTime: "",
    cellphone: "",
    email: "",
    category: {},
    form: {},
    inspectorSign1: "",
    inspectorSign2: "",
    ownerSign: "",
    days: "",
  },
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

    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case UPDATE_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload,
      };

    case GET_USER_INSPECTIONS:
      return {
        ...state,
        inspections: payload,
        totalInpections: payload.total,
      };

    case FILTER_INSPECTIONS:
      return {
        ...state,
        totalInpections: payload.total,
        filteredInspections: payload,
      };

    case HANDLE_FILTERS:
      return {
        ...state,
        submitFilters: payload,
      };

    case RESET_FILTERS:
      return {
        ...state,
        submitFilters: {},
        filteredInspections: {},
        searchInput: "",
      };
    case SET_SEARCHED_INPUT:
      return {
        ...state,
        searchInput: payload,
      };

    case SET_DATE:
      return {
        ...state,
        date: payload,
      };

    case GET_INSPECTION_BY_ID:
      return {
        ...state,
        inspectionDetail: payload,
      };

    case SET_PDF_DATA:
      return {
        ...state,
        pdfData: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
