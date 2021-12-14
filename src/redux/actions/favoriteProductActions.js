import axios from "axios";
import jwtDecode from "jwt-decode";

const PRODUCT_FAVORITES = "PRODUCT_FAVORITES";

const PRODUCT_FAVORITES_SIGN_OUT = "PRODUCT_FAVORITES_SIGN_OUT";


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
                    productList: response.data.favoriteProductList,
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
                    productList: response.data.favoriteProductList,          
                });
            })
        } else return null;
    };
};

export const getAllProductsFromUserFavorites = () => {
    return (dispatch, getState) => {

        const token = getState().auth.token;
        console.log('TKKKNNNN',token);
        if (token) {
            const user = jwtDecode(token);
            axios.get(`http://localhost:8762/user/getAllProductsFromUserFavorites/${user.sub}`,
             {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {

                console.log('initial fav prod',response.data);
                dispatch({
                    type: PRODUCT_FAVORITES,
                    id: response.data.id,
                    productList: response.data,
                });
            })
        } else return null;
    };
};

export const signOutProductFavorites = () => {
    return (dispatch) => {
        dispatch({
            type: PRODUCT_FAVORITES_SIGN_OUT,
        });
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
            case PRODUCT_FAVORITES_SIGN_OUT:   
                return {
                    id: null,
                    productList: []
                };    
        default:
            return state;
    }
};

export default favoriteProductActions;