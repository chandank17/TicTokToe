import { combineReducers, createStore, compose } from 'redux';
import ticToc from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
    ticToc: ticToc
});



let store = createStore(reducers);

export default store;