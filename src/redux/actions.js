import {
  GET_CATEGORY,
  SET_SELECTED_OPTION,
  GET_USER_DATA,
  SET_FORM_DATA,
  SET_INSPECTION_STATE,
  GET_CATEGORY_BY_ID,
  GET_ALL_USERS,
  SET_ADMIN_OPTION,
  GET_USER_INSPECTIONS,
  FILTER_INSPECTIONS,
  RESET_FILTERS,
  HANDLE_FILTERS,
  UPDATE_CURRENT_PAGE,
  UPDATE_TOTAL_PAGES,
  SET_SEARCHED_INPUT,
  GET_INSPECTION_BY_ID,
  SET_DATE,
  SET_PDF_DATA,
} from "./actions-types";
import axios from "axios";

const endpointCategories = "http://localhost:3001/categories";
const endpointUserData = "http://localhost:3001/user/profile";
const endpointUsers = "http://localhost:3001/user";
const backUrl = import.meta.env.VITE_BACK_URL;
export const getAllCategories = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpointCategories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch({
        type: GET_CATEGORY,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching categories", error.message);
    }
  };
};

export const setSelectedOption = (option) => {
  return function (dispatch) {
    dispatch({
      type: SET_SELECTED_OPTION,
      payload: option,
    });
  };
};
export const setAdminOption = (option) => {
  return function (dispatch) {
    dispatch({
      type: SET_ADMIN_OPTION,
      payload: option,
    });
  };
};

export const getUserData = (token) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(endpointUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch({
        type: GET_USER_DATA,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching user information", error.message);
    }
  };
};

export const setFormData = (data) => {
  return async function (dispatch) {
    dispatch({
      type: SET_FORM_DATA,
      payload: data,
    });
  };
};

export const setInspectionState = (state) => {
  return function (dispatch) {
    dispatch({
      type: SET_INSPECTION_STATE,
      payload: state,
    });
  };
};

export const getCategoryById = (id, token) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${endpointCategories}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch({
        type: GET_CATEGORY_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching category", error.message);
    }
  };
};

export const getAllUsers = (token) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(endpointUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch({
        type: GET_ALL_USERS,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching users", error.message);
    }
  };
};
export const updateCurrentPage = (page) => ({
  type: UPDATE_CURRENT_PAGE,
  payload: page,
});

export const updateTotalPages = (totalPages) => ({
  type: UPDATE_TOTAL_PAGES,
  payload: totalPages,
});

export const getAllInspections = (token, page, pageSize) => {
  return async function (dispatch, getStage) {
    const { currentPage } = getStage();
    try {
      const { data } = await axios.get(`${backUrl}/inspection`, {
        params: {
          page: page,
          size: pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: GET_USER_INSPECTIONS,
        payload: data,
      });
      const totalPages = Math.ceil(data.total / 12);
      dispatch(updateTotalPages(totalPages));
    } catch (error) {
      console.error(error.message);
    }
  };
};
export const filterInspections = (token, params, page, pageSize) => {
  return async (dispatch, getState) => {
    try {
      const queryParams = {
        page: page,
        size: pageSize,
        companyName: params.companyName,
        fullname: params.fullname,
        date: params.date,
      };

      const { data } = await axios.get(`${backUrl}/inspection`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: queryParams,
      });
      dispatch({
        type: FILTER_INSPECTIONS,
        payload: data,
      });
      const totalPages = Math.ceil(data.total / pageSize);
      dispatch(updateTotalPages(totalPages));
    } catch (error) {
      console.error("Error al filtrar inspecciones", error);
    }
  };
};

export const resetFiltersParams = () => {
  return {
    type: RESET_FILTERS,
  };
};

export const filterParams = (params) => {
  return function (dispatch) {
    dispatch({
      type: HANDLE_FILTERS,
      payload: params,
    });
  };
};

export const setSearchedInput = (searchInput) => {
  return function (dispatch) {
    dispatch({
      type: SET_SEARCHED_INPUT,
      payload: searchInput,
    });
  };
};

export const setDate = (date) => {
  return function (dispatch) {
    dispatch({
      type: SET_DATE,
      payload: date,
    });
  };
};

export const getInspectionById = (id, token) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${backUrl}/inspection/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: GET_INSPECTION_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.error("Error al buscar inspección", error);
    }
  };
};
export const handleFilters = (params) => {
  return {
    type: HANDLE_FILTERS,
    payload: params,
  };
};

export const setPdfData = (data) => {
  return function (dispatch) {
    dispatch({
      type: SET_PDF_DATA,
      payload: data,
    });
  };
};
