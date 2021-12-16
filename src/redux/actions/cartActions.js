import axios from "axios";
import jwtDecode from "jwt-decode";

const GET_CART = "GET_CART";


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
                dispatch({
                    type: GET_CART,
                    id: response.data.id,
                    productList: response.data.productList,
                    total: response.data.total
                });          
            })
   
    };
};

export const removeProductFromCart = () => async (dispatch) => { 
    const token = localStorage.getItem('token');
    
    if (token) {
      
        const user = jwtDecode(token);
      await axios.get(`http://localhost:8762/cart/getCartByEmail?email=${user.sub}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then((response) => {
            dispatch({
                type: GET_CART,
                id: response.data.id,
                productList: response.data.productList,
                total: response.data.total
            });          
        })

};
};

const initialState = {
    id: null,
    productList: [],
    total: null
};



const cartActions = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_CART:
            return {
                ...initialState,
                id: action.id,
                productList: action.productList,
                total: action.total
            };
           
        default:
            return state;
    }
};

export default cartActions;