import axios from "axios";
import jwtDecode from "jwt-decode";
import {toast} from "react-toastify";

const SIGN_IN = "SIGN_IN";
const SIGN_UP = "SIGN_UP";
const USER_LOADED = "USER_LOADED";
const SIGN_OUT = "SIGN_OUT";



export const signUp = (firstName, lastName, email, phoneNumber, deliveryAddress, password) => {
    return () => {
        axios
            .post('http://localhost:8762/user/addUser', {
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
            toast.success("Succesfully signed Up! Please confirm your Email!",{ position: "top-right"})
    };
};





export const signIn = (email, password) => async (dispatch) => {
    
    try {
        await axios.post('http://localhost:8762/login', { email, password })
            .then((response) => {
                console.log('RESPONSEE:', response);
                localStorage.setItem("token", response.headers.authorization)
                dispatch({
                     type: SIGN_IN,
                     token: response.headers.authorization,
                     err:null
                     });
            })
    } catch (e) {
        dispatch({
            type: SIGN_IN,
            err: e.message
            });
        console.log("Token setup failed!")
    }

    try {
        await axios.get(`http://localhost:8762/user/getUserByEmail?email=${email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then((response) => {
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
        })
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

export const loadUser = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        if (token) {
            const user = jwtDecode(token);
          //  axios.get(`http://localhost:8762/user/getUserByEmail?email=${user.sub}`, {
            axios.get(`https://spring-store-zuul-service.herokuapp.com/user/getUserByEmail?email=${user.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                dispatch({
                    type: USER_LOADED,
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                    deliveryAddress: response.data.deliveryAddress,
                    favoriteProductList: response.data.favoriteProductList,
                    err:null
                });
            })
        } else return null;
    };
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