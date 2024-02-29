import {
  GET_CATEGORY,
  SET_SELECTED_OPTION,
  GET_USER_DATA,
} from "./actions-types";
import axios from "axios";

const endpointCategories = "http://localhost:3001/categories";
const endpointUserData = "http://localhost:3001/user/profile";

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpointCategories);
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
