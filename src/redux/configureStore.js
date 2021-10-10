import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import productsReducer from "./actions/productActions";
import appBarReducer from "./actions/secondaryAppBar";
import authReducer from "./actions/authActions";


import thunk from 'redux-thunk';

const reducer = combineReducers({
    products: productsReducer,
    secondaryAppBar:appBarReducer,
    auth:authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(thunk)));

export default store;