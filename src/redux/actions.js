import { 
    GET_CATEGORY,
    SET_SELECTED_OPTION
    } from "./actions-types";
import axios from "axios";

const endpointCategories = 'http://localhost:3001/categories'

export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(endpointCategories);
            return dispatch({
                type:GET_CATEGORY,
                payload:data,
            })
        } catch (error) {
            console.error('Error fetching categories', error.message)
        }
    }
};

export const setSelectedOption = (option) => {
    return function (dispatch){
      dispatch({
        type:SET_SELECTED_OPTION,
        payload:option,
      })
    }
  }