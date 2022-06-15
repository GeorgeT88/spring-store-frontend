import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const GET_CART = "GET_CART";
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
const CART_SIGN_OUT = "CART_SIGN_OUT";



export const getCartByUserEmail = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const user = jwtDecode(token);
        const response = await axios.get(process.env.REACT_APP_CART_PATH + user.sub, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        console.log("RESPONSE..", response)
        dispatch({
            type: GET_CART,
            id: response.data.id,
            entries: response.data.entries,
            total: response.data.total
        });

    };
};

export const addProductToCart = (productName, quantity) => async (dispatch) => {

    const token = localStorage.getItem('token');

    if (token) {
        const user = jwtDecode(token);
        const response = await axios.post(process.env.REACT_APP_CART_PATH + user.sub + "/" + productName + "/" + quantity, {
            email: user.sub,
            productName: productName,
            quantity:quantity
        },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token
                }
            })
        dispatch({
            type: ADD_PRODUCT_TO_CART,
            id: response.data.id,
            entries: response.data.entries,
            total: response.data.total
        });
        toast.success("Product Added To Cart!", { position: "top-right" })

    } else return null;

};


export const updateProductToCart = (product, size) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;
        console.log('log', size);
        if (token) {
            const user = jwtDecode(token);
            axios.put(process.env.REACT_APP_CART_PATH + user.sub + "/" + product + "/" + size, {},
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                }).then((response) => {
                    dispatch({
                        type: REMOVE_PRODUCT_FROM_CART,
                        entries: response.data.entries,
                        total: response.data.total
                    });
                    toast.info("Product Quantity updated!", { position: "top-right" })
                })
        } else return null;
    };
};

export const removeProductFromCart = (productName) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;
        if (token) {
            const user = jwtDecode(token);
            axios.delete(process.env.REACT_APP_CART_PATH + user.sub + "/" + productName,
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                }).then((response) => {
                    dispatch({
                        type: REMOVE_PRODUCT_FROM_CART,
                        entries: response.data.entries,
                        total: response.data.total
                    });
                    toast.error("Product Removed from Cart!", { position: "top-right" })
                })
        } else return null;
    };
};
export const signOutCart = () => {
    return (dispatch) => {
        dispatch({
            type: CART_SIGN_OUT,
        });
    };
};

const initialState = {
    entries: [],
    total: 0
};



const cartActions = (state = initialState, action) => {
    switch (action.type) {

        case GET_CART:
        case ADD_PRODUCT_TO_CART:
        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...initialState,
                entries: action.entries,
                total: action.total
            };
        case CART_SIGN_OUT:
            return {
                entries: [],
                total: 0
            };

        default:
            return state;
    }
};

export default cartActions;