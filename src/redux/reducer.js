import { 
    GET_CATEGORY,
    SET_SELECTED_OPTION

    } from "./actions-types";

const initialState = {
    categories:[],
    selectedOption: "personalData"
}
const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_CATEGORY:
            return {
                ...state,
                categories:payload
            }
            
        case SET_SELECTED_OPTION:
            return{
                ...state,
                selectedOption: payload,
            }
    
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;