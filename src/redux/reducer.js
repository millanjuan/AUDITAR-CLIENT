import { 
    GET_CATEGORY,

    } from "./actions-types";

const initialState = {
    categories:[],
}
const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_CATEGORY:
            return {
                ...state,
                categories:payload
            }
            
            
    
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;