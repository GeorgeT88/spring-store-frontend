import axios from "axios";
import jwtDecode from "jwt-decode";

const SET_PRODUCT_TO_FAVORITES = "SET_PRODUCT_TO_FAVORITES";


export const getSetProductToFavorites = (product) => {
    return (dispatch, getState) => {
       
        const token = getState().auth.token;
        
        console.log("TOKKEEN  ",token);
        if (token) {
            const user = jwtDecode(token);
            axios.get(`http://localhost:8762/user/addProductToUserFavorites/${user.sub}/${product}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                dispatch({
                    type: SET_PRODUCT_TO_FAVORITES,
                    id: response.data.id,
                    productList: response.data.productList,
                    total: response.data.total
                });          
            })
        } else return null;
    };
};

const initialState = {
    id: null,
    productList: [],
    total: null
};



const cartActions = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT_TO_FAVORITES:
            return {
                ...initialState,
                id: action.id,
                productList: action.productList,
                total: action.total
            };
        default:
            console.log("CART DATAAAA:  ", state);
            return state;
    }
};

export default cartActions;