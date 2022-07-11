import axios from "axios";

const GET_ALLPRODUCTS_BY_CATEGORY = "GET_ALLPRODUCTS_BY_CATEGORY";
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const GET_PRODUCT_BY_PRODUCTNAME = "GET_PRODUCT_BY_PRODUCTNAME";

export const getAllProducts = () => async (dispatch) => {
  const response = await axios.get(process.env.REACT_APP_PRODUCT_PATH);

  dispatch({
    type: GET_ALL_PRODUCTS,
    category: "All Products",
    products: response.data,
  });
};

export const getAllProductsByCategory = (category) => async (dispatch) => {
  const response = await axios.get(
    process.env.REACT_APP_PRODUCT_PATH + `?category=${category}`
  );
  dispatch({
    type: GET_ALLPRODUCTS_BY_CATEGORY,
    category: category,
    products: response.data,
  });
};

export const getProductByProductName = (name) => async (dispatch) => {
  try {
    const response = await axios.get(process.env.REACT_APP_PRODUCT_PATH + name);
    let tmpArray = [];
    tmpArray.push(response.data);
    dispatch({
      type: GET_PRODUCT_BY_PRODUCTNAME,
      category: "No Category",
      products: tmpArray,
    });
  } catch (e) {
    dispatch({
      type: GET_PRODUCT_BY_PRODUCTNAME,
      category: "No Category",
      products: [],
    });
  }
};

const initialState = {
  category: "All Products",
  products: [],
};

const productsActions = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
    case GET_ALLPRODUCTS_BY_CATEGORY:
    case GET_PRODUCT_BY_PRODUCTNAME:
      return {
        ...initialState,
        category: action.category,
        products: action.products,
      };
    default:
      return state;
  }
};
export default productsActions;
