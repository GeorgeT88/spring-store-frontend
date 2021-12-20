import axios from "axios";
import jwtDecode from "jwt-decode";

const GET_CART = "GET_CART";
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
const CART_SIGN_OUT = "CART_SIGN_OUT";



export const getCartByUserEmail = () => async (dispatch) => { 
        const token = localStorage.getItem('token');
        console.log("CART...TOKEN",token);
        if (token) {
            const user = jwtDecode(token);
          await axios.get(`http://localhost:8762/cart/getCartByEmail?email=${user.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                console.log("RESPONSE..",response)
                dispatch({
                    type: GET_CART,
                    id: response.data.id,
                    productsInCartList: response.data.productsInCartList,
                    total: response.data.total
                });          
            })
   
    };
};

export const addProductToCart = (product,size) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;

        if (token) {
            const user = jwtDecode(token);
            axios.post(`http://localhost:8762/cart/addProductToCart/${user.sub}/${product}/${size}`,
             {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                dispatch({
                    type: ADD_PRODUCT_TO_CART,
                    id: response.data.id,
                    productsInCartList: response.data.productsInCartList,
                    total: response.data.total  
                });
            })
        } else return null;
    };
};

export const removeProductFromCart = (product,size) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;
        if (token) {
            const user = jwtDecode(token);
            axios.put(`http://localhost:8762/cart/removeProductFromCart/${user.sub}/${product}/${size}`,{},
             {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                dispatch({
                    type: REMOVE_PRODUCT_FROM_CART,
                    id: response.data.id,
                    productsInCartList: response.data.productsInCartList,
                    total: response.data.total        
                });
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
    id: null,
    productsInCartList: null,
    total: null
};



const cartActions = (state = initialState, action) => {
    switch (action.type) {

        case GET_CART:
        case ADD_PRODUCT_TO_CART:    
        case REMOVE_PRODUCT_FROM_CART:
            console.log("ACTION CART....",action )
            return {
                ...initialState,
                id: action.id,
                productsInCartList: action.productsInCartList,
                total: action.total
            };
            case CART_SIGN_OUT:   
            return {
                id: null,
                productsInCartList: [],
                total: null
            };     
           
        default:
            return state;
    }
};

export default cartActions;