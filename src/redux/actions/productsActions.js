import axios from "axios";

const ALLPRODUCTSBYCATEGORY = "ALLPRODUCTSBYCATEGORY";
const ALLPRODUCTS = "ALLPRODUCTS";
const PRODUCTBYPRODUCTNAME = "PRODUCTBYPRODUCTNAME";



export const getAllProducts = () => async (dispatch) => {


  const response = await axios.get(process.env.REACT_APP_GET_ALL_PRODUCTS)

  dispatch({
    type: ALLPRODUCTS,
    category: 'All Products',
    products: response.data
  });
}


export const getAllProductsByCategory = (category) => async (dispatch) => {
  const response = await axios.get(process.env.REACT_APP_GET_PRODUCT_BY_PRODUCT_CATEGORY + category)
  dispatch({
    type: ALLPRODUCTSBYCATEGORY,
    category: category,
    products: response.data
  })
}

export const getProductByProductName = (productName) => async (dispatch) => {
  try {
   const response = await axios.get(process.env.REACT_APP_GET_PRODUCT_BY_PRODUCT_NAME + productName)
    let tmpArray = []
    tmpArray.push(response.data)
    dispatch({
      type: PRODUCTBYPRODUCTNAME,
      category: 'No Category',
      products: tmpArray
    })
} catch (e) {
    dispatch({
      type: PRODUCTBYPRODUCTNAME,
      category: 'No Category',
      products: []
        });
}


}

const initialState = {
  category: 'All Products',
  products: []
}

const productActions = (state = initialState, action) => {

  switch (action.type) {
    case ALLPRODUCTS:
    case ALLPRODUCTSBYCATEGORY:
    case PRODUCTBYPRODUCTNAME:

      return {
        ...initialState,
        category: action.category,
        products: action.products
      }
    default:
      return state;
  }

};
export default productActions;