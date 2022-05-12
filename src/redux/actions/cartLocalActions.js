
const ADD_PRODUCT_TO_LOCAL_CART = "ADD_PRODUCT_TO_LOCAL_CART";
const REMOVE_PRODUCT_FROM_LOCAL_CART = "REMOVE_PRODUCT_FROM_LOCAL_CART";
const UPDATE_PRODUCT_TO_LOCAL_CART = "UPDATE_PRODUCT_TO_LOCAL_CART";






export const addProductToLocalCart = (product, quantity) => (
    {
        type: ADD_PRODUCT_TO_LOCAL_CART,
        product: Object.assign({}, product, { quantity: quantity })
    }
)

export const updateProductToLocalCart = (product, size) => (
    {
        type: UPDATE_PRODUCT_TO_LOCAL_CART,
        size: size,
        product: product
    }
)
export const removeProductfromLocalCart = (product) => (
    {
        type: REMOVE_PRODUCT_FROM_LOCAL_CART,
        product: product

    }
)

const initialState = {
    products: []
}

const cartLocalActions = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PRODUCT_TO_LOCAL_CART:
            return {
                ...initialState,
                products: [...state.products, action.product]
            }
        case UPDATE_PRODUCT_TO_LOCAL_CART:
            return {
                ...initialState,
                products: [...state.products, action.product]
            }
        case REMOVE_PRODUCT_FROM_LOCAL_CART:
            return {
                ...initialState,
                products: state.products.filter((product) => product.productName !== action.product.productName)
            }
        default:
            return state;
    }

};


export default cartLocalActions;