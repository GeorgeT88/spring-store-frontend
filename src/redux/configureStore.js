import { combineReducers} from "redux";
import productsReducer from "./actions/productsActions";
import productReducer from "./actions/productActions";
import appBarReducer from "./actions/secondaryAppBar";
import authReducer from "./actions/authActions";
import cartReducer from "./actions/cartActions";
import orderAddressReducer from "./actions/orderAddressActions";
import orderStepReducer from "./actions/orderStepActions";
import orderCheckoutReducer from "./actions/orderCheckoutActions";
import orderCreditCardInfoReducer from "./actions/orderCreditCardInfoActions";
import loggedInReducer from "./actions/loggedInActions";
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' 
import thunk from 'redux-thunk';
import favoriteProductReducer from './actions/favoriteProductActions';
import favoriteLocalProductReducer from './actions/favoriteLocalProductActions';
import { composeWithDevTools } from 'redux-devtools-extension'


const reducers = combineReducers({
    products: productsReducer,
    product: productReducer,
    secondaryAppBar:appBarReducer,
    orderAddress:orderAddressReducer,
    orderStep:orderStepReducer,
    orderCheckout:orderCheckoutReducer,
    orderCreditCardInfo:orderCreditCardInfoReducer,
    cart:cartReducer,
    auth:authReducer,
    favoriteProduct: favoriteProductReducer,
    favoriteLocalProduct: favoriteLocalProductReducer,
    loggedIn: loggedInReducer,
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = createStore(
    persistedReducer,
    composeWithDevTools( 
    applyMiddleware(thunk)) // add any middlewares here
)



const  persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export {store, persistor}