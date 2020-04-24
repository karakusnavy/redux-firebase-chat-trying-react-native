import * as actionTypes from "../actions/actionTypes";

 
 
const currentPageReducers = (state = 'Genel', action) => {


    if (actionTypes.CURRENT_PAGE == action.type) {


        return (action.payload);
    }
    else {
        return state;
    }
};

export default currentPageReducers

