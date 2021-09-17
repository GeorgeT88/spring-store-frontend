import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import productsReducer from "./actions/productActions";
import appBarReducer from "./actions/secondaryAppBar";
import isLoggedReducer from "./actions/loginActions";


import thunk from 'redux-thunk';

const reducer = combineReducers({
    products: productsReducer,
    secondaryAppBar:appBarReducer,
    isLogged:isLoggedReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(thunk)));

export default store;