import { toast } from "react-toastify";

const ADD_PRODUCT_TO_LOCAL_CART = "ADD_PRODUCT_TO_LOCAL_CART";
const REMOVE_PRODUCT_FROM_LOCAL_CART = "REMOVE_PRODUCT_FROM_LOCAL_CART";
const UPDATE_PRODUCT_TO_LOCAL_CART = "UPDATE_PRODUCT_TO_LOCAL_CART";






export const addProductToLocalCart = (product, quantity) => async (dispatch) => {
    dispatch({
        type: ADD_PRODUCT_TO_LOCAL_CART,
        product: Object.assign({}, product, { quantity: quantity })

    });
    toast.success("Product Added To Local Cart!", { position: "top-right" })
}

export const updateProductToLocalCart = (product, quantity) => async (dispatch) => {
    dispatch({
        type: UPDATE_PRODUCT_TO_LOCAL_CART,
        product: Object.assign({}, product, { quantity: quantity })
    })
    toast.info("Product Quantity Local updated!", { position: "top-right" })
}

export const removeProductfromLocalCart = (product) => async (dispatch) => {
    dispatch({
        type: REMOVE_PRODUCT_FROM_LOCAL_CART,
        product: product
    });
    toast.error("Product Removed from Local Cart!", { position: "top-right" })
}

const initialState = {
    products: []
}

const cartLocalActions = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PRODUCT_TO_LOCAL_CART:
            return {
                ...initialState,
                products: [...state.products, action.product],
                total: action.total
            }
        case UPDATE_PRODUCT_TO_LOCAL_CART:

            const index = state.products.findIndex(product => product.productName === action.product.productName); //finding index of the item
            const newArray = [...state.products]; //making a new array
            newArray[index].quantity = action.product.quantity//changing value in the new array
            return {
                ...initialState, //copying the orignal state
                products: newArray, //reassingning todos to new array
            }

        case REMOVE_PRODUCT_FROM_LOCAL_CART:
            return {
                ...initialState,
                products: state.products.filter((product) => product.productName !== action.product.productName),
                total: action.total
            }
        default:
            return state;
    }

};


export default cartLocalActions;