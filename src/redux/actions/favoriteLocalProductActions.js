import { toast } from "react-toastify";

const ADD_PRODUCT_TO_FAVORITES_LIST = "ADD_PRODUCT_TO_FAVORITES_LIST";
const REMOVE_PRODUCT_TO_FAVORITES_LIST = "REMOVE_PRODUCT_TO_FAVORITES_LIST";
const CLEAR_PRODUCTS_TO_FAVORITES_LIST = "CLEAR_PRODUCTS_TO_FAVORITES_LIST";


export const addProductToFavoritesLocal = (product) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_TO_FAVORITES_LIST,
    product: product,
  });
  toast.success("Product Added To Local Favorites!", {
     position: "top-right",
     toastId: "addProdToFavMsg"
    });
};

export const removeProductfromFavoritesLocal =
  (product) => async (dispatch) => {
    dispatch({
      type: REMOVE_PRODUCT_TO_FAVORITES_LIST,
      product: product,
    });
    toast.error("Product Removed from Local Favorites!", {
      position: "top-right",
      toastId: "removeProdFromFavMsg"
    });
  };

  export const clearProductsFromFavoritesLocal = () => async (dispatch) => {
    dispatch({
      type: CLEAR_PRODUCTS_TO_FAVORITES_LIST,
    });
  };

const initialState = {
  products: [],
};

const favoriteProductActions = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_FAVORITES_LIST:
      return {
        ...initialState,
        products: [...state.products, action.product],
      };
    case REMOVE_PRODUCT_TO_FAVORITES_LIST:
      return {
        ...initialState,
        products: state.products.filter(
          (product) => product.name !== action.product.name
        ),
      };
      case CLEAR_PRODUCTS_TO_FAVORITES_LIST:
        return {
          ...initialState,
          products: [],
        };                   
    default:
      return state;
  }
};

export default favoriteProductActions;
