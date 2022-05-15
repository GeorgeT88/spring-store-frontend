import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getCartByUserEmail } from "../actions/cartActions";
import { getAllProductsFromUserFavorites } from "../actions/favoriteProductActions";



const SIGN_IN = "SIGN_IN";
const SIGN_UP = "SIGN_UP";
const USER_LOADED = "USER_LOADED";
const SIGN_OUT = "SIGN_OUT";



export const signUp = (firstName, lastName, email, phoneNumber, deliveryAddress, password) => async () => {

    await axios
        .post(process.env.REACT_APP_ADD_USER, {
            firstName,
            lastName,
            email,
            phoneNumber,
            deliveryAddress,
            password
        }

        )
        .catch((error) => {
            console.log(error.response);
        });
    toast.success("Succesfully signed Up! Please confirm your Email!", { position: "top-right" })

};





export const signIn = (email, password) => async (dispatch) => {

    try {
        const responseLogin = await axios.post(process.env.REACT_APP_LOGIN, { email, password })
        console.log('RESPONSEE:', responseLogin);
        localStorage.setItem("token", responseLogin.headers.authorization)
        dispatch({
            type: SIGN_IN,
            token: responseLogin.headers.authorization,
            err: null
        });
    } catch (e) {
        dispatch({
            type: SIGN_IN,
            err: e.message
        });
        console.log("Token setup failed!")
    }

    try {
        const response = await axios.get(process.env.REACT_APP_GET_USER_BY_EMAIL + email, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        dispatch({
            type: SIGN_IN,
            token: localStorage.getItem('token'),
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
            deliveryAddress: response.data.deliveryAddress,
            favoriteProductList: response.data.favoriteProductList,
            err: null
        });

    }
    catch (e) {
        console.log("Login failed!")
    }

    try {
        dispatch(getAllProductsFromUserFavorites());
    }
    catch (e) {
        console.log("Login failed!")
    }

    try {
        dispatch(getCartByUserEmail());
    }
    catch (e) {
        console.log("Login failed!")
    }
}

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: SIGN_OUT,
        });
    };
};

export const loadUser = () => async (dispatch) => {
    const token = localStorage.getItem('token');

    if (token) {
        const user = jwtDecode(token);
        const response = await axios.get(process.env.REACT_APP_GET_USER_BY_EMAIL + user.sub, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        dispatch({
            type: USER_LOADED,
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
            deliveryAddress: response.data.deliveryAddress,
            favoriteProductList: response.data.favoriteProductList,
            err: null
        });
    } else return null;
};


const initialState = {
    token: localStorage.getItem("token"),
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    deliveryAddress: null,
    favoriteProductList: [],
    err: null
};



const authActions = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
        case SIGN_UP:
        case USER_LOADED:
            return {
                ...initialState,
                token: localStorage.getItem('token'),
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                phoneNumber: action.phoneNumber,
                deliveryAddress: action.deliveryAddress,
                favoriteProductList: action.favoriteProductList,
                err: action.err
            };
        case SIGN_OUT:
            localStorage.removeItem("token");
            return {
                token: null,
                id: null,
                firstName: null,
                lastName: null,
                email: null,
                phoneNumber: null,
                deliveryAddress: null,
                favoriteProductList: [],
                err: null
            };
        default:
            return state;
    }
};

export default authActions;
