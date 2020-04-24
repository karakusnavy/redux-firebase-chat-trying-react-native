import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
// Yazdığımız Combine Reducer'ı dahil ediyoruz
import reducers from "./index"
const initialState = {};
const middleware = [thunk];
// Aslında dikkat etmemiz gereken tek şey 2 parametre
// rootReducer olarak yazdığımız reducers/index.js
// initialState olarak başlangıç State'i
export default function configureStore() {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    );
} 