import axios from "axios";

const ALLPRODUCTSBYCATEGORY = "ALLPRODUCTSBYCATEGORY";
const ALLPRODUCTS = "ALLPRODUCTS";



export const getAllProducts = () => async (dispatch) => {


  const response = await axios.get('http://localhost:8081/getAllProducts')

  dispatch({
    type: ALLPRODUCTS,
    category: 'All Products',
    products: response.data
  });
}


export const getAllProductsByCategory = (category) => async (dispatch) => {
  const response = await axios.get(`http://localhost:8081/getByProductCategory/${category}`)
  dispatch({
    type: ALLPRODUCTSBYCATEGORY,
    category: category,
    products: response.data
  })
}

const initialState = {
  category: 'All Products',
  products: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {

  switch (action.type) {
    case ALLPRODUCTS:
      return {
        ...initialState,
        category: action.category,
        products: action.products
      }
    case ALLPRODUCTSBYCATEGORY:
      return {
        ...initialState,
        category: action.category,
        products: action.products
      }
    default:
      return state;
  }
};