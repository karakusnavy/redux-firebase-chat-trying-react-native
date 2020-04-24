import { combineReducers } from "redux";
import exampleReducers from "./exampleReducers";
import currentPageReducers from './currentPageReducers'

const reducers = combineReducers({
    exampleReducers,
    currentPageReducers,

});

export default reducers;