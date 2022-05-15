import { toast } from "react-toastify";

const ADD_PRODUCT_TO_FAVORITES_LIST = "ADD_PRODUCT_TO_FAVORITES_LIST";
const REMOVE_PRODUCT_TO_FAVORITES_LIST = "REMOVE_PRODUCT_TO_FAVORITES_LIST";




export const addProductToFavoritesLocal = (product) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_TO_FAVORITES_LIST,
    product: product
  })
  toast.success("Product Added To Local Favorites!", { position: "top-right" })
}

export const removeProductfromFavoritesLocal = (product) => async (dispatch) => {
  dispatch({
    type: REMOVE_PRODUCT_TO_FAVORITES_LIST,
    product: product
  })
  toast.error("Product Removed from Local Favorites!", { position: "top-right" })
}

const initialState = {
  products: []
}

const favoriteProductActions = (state = initialState, action) => {

  switch (action.type) {
    case ADD_PRODUCT_TO_FAVORITES_LIST:
      return {
        ...initialState,
        products: [...state.products, action.product]
      }
    case REMOVE_PRODUCT_TO_FAVORITES_LIST:
      return {
        ...initialState,
        products: state.products.filter((product) => product.productName !== action.product.productName)
      }
    default:
      return state;
  }

};


export default favoriteProductActions;