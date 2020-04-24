import * as actionTypes from "./actionTypes"

export const currentPageReducers = (value) => ({
    type: actionTypes.CURRENT_PAGE,
    payload: value
})
