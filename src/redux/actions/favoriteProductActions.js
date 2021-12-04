import axios from "axios";
import jwtDecode from "jwt-decode";

const PRODUCT_FAVORITES = "SET_PRODUCT_TO_FAVORITES";


export const addProductToFavorites = (product) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;

        if (token) {
            const user = jwtDecode(token);

            axios.put(`http://localhost:8762/user/addProductToUserFavorites/${user.sub}/${product}`,{},
             {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                dispatch({
                    type: PRODUCT_FAVORITES,
                    id: response.data.id,
                    productList: response.data.productList,
                    total: response.data.total
                });
            })
        } else return null;
    };
};

export const removeProductToFavorites = (product) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;
        
        if (token) {
            const user = jwtDecode(token);

            axios.put(`http://localhost:8762/user/removeProductFromUserFavorites/${user.sub}/${product}`,{},
             {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                dispatch({
                    type: PRODUCT_FAVORITES,
                    id: response.data.id,
                    productList: response.data.productList,          
                });
            })
        } else return null;
    };
};

const initialState = {
    id: null,
    productList: [],
};



const favoriteProductActions = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_FAVORITES:
            return {
                ...initialState,
                id: action.id,
                productList: action.productList,
            };
        default:
            return state;
    }
};

export default favoriteProductActions;