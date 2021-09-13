import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import productsReducer from "./ducks/products";
import appBarReducer from "./ducks/appBar";


import thunk from 'redux-thunk';

const reducer = combineReducers({
    products: productsReducer,
    appBar:appBarReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;