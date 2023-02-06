import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const PRODUCT_FAVORITES = "PRODUCT_FAVORITES";

const PRODUCT_FAVORITES_SIGN_OUT = "PRODUCT_FAVORITES_SIGN_OUT";

const PRODUCT_FAVORITES_LOCAL = "PRODUCT_FAVORITES_LOCAL";

export const addProductToFavorites = (product) => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    const user = jwtDecode(token);
    const response = await axios.post(
      process.env.REACT_APP_USER_PATH +
        "userFavorites/" +
        product,
      {
        email: user.sub,
        productName: product,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: PRODUCT_FAVORITES,
      products: response.data,
    });
    toast.success("Product Added To Favorites!", {
       position: "top-right",
       toastId: "addProdToFavMsg"
       });
  } else {
    return null;
  }
};

export const addProductsToFavorites = (products) => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token && products?.length > 0) {
    const response = await axios.put(
      process.env.REACT_APP_USER_PATH +"userFavorites", products
      ,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: PRODUCT_FAVORITES,
      products: response.data,
    });
  } else {
    return null;
  }
};

export const removeProductFromFavorites = (product) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .delete(
          process.env.REACT_APP_USER_PATH +
            "userFavorites/" +
            product,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          dispatch({
            type: PRODUCT_FAVORITES,
            products: response.data,
          });
          toast.error("Product removed from Favorites!", {
            position: "top-right",
            toastId: "removeProdFromFavMsg"
          });
        });
    } else {
      return null;
    }
  };
};

export const getAllProductsFromUserFavorites = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(process.env.REACT_APP_USER_PATH + "userFavorites", {
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          dispatch({
            type: PRODUCT_FAVORITES,
            products: response.data,
          });
        });
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
  products: [],
};

const favoriteProductActions = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_FAVORITES:
      return {
        ...initialState,
        products: action.products,
      };
    case PRODUCT_FAVORITES_LOCAL:
      return {
        ...initialState,
        products: [...state.products, action.product],
      };
    case PRODUCT_FAVORITES_SIGN_OUT:
      return {
        products: [],
      };
    default:
      return state;
  }
};

export default favoriteProductActions;
