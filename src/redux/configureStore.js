import { combineReducers} from "redux";
import productsReducer from "./actions/productsActions";
import productReducer from "./actions/productActions";
import appBarReducer from "./actions/secondaryAppBar";
import authReducer from "./actions/authActions";



const reducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    secondaryAppBar:appBarReducer,
    auth:authReducer
});

export default reducer;