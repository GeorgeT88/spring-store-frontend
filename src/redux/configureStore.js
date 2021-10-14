import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import productsReducer from "./actions/productActions";
import appBarReducer from "./actions/secondaryAppBar";
import authReducer from "./actions/authActions";



const reducer = combineReducers({
    products: productsReducer,
    secondaryAppBar:appBarReducer,
    auth:authReducer
});




export default reducer;