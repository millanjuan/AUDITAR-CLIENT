import { 
    GET_CATEGORY,
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