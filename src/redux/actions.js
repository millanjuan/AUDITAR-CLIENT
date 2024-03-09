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
import axios from "axios";

const endpointCategories = "http://localhost:3001/categories";
const endpointUserData = "http://localhost:3001/user/profile";
const endpointUsers = "http://localhost:3001/user";

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
