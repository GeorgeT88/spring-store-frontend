import axios from "axios";

const ALLPRODUCTSBYCATEGORY = "ALLPRODUCTSBYCATEGORY";
const ALLPRODUCTS = "ALLPRODUCTS";
const PRODUCTBYPRODUCTNAME = "PRODUCTBYPRODUCTNAME";



export const getAllProducts = () => async (dispatch) => {


  const response = await axios.get('http://localhost:8762/product/getAllProducts')

  dispatch({
    type: ALLPRODUCTS,
    category: 'All Products',
    products: response.data
  });
}


export const getAllProductsByCategory = (category) => async (dispatch) => {
  const response = await axios.get(`http://localhost:8762/product/getByProductCategory/${category}`)
  dispatch({
    type: ALLPRODUCTSBYCATEGORY,
    category: category,
    products: response.data
  })
}

export const getProductByProductName = (productName) => async (dispatch) => {
  const response = await axios.get(`http://localhost:8762/product/getProductByProductName?productName=${productName}`)
  dispatch({
    type: PRODUCTBYPRODUCTNAME,
    category: '',
    products: response.data
  })
}

const initialState = {
  category: 'All Products',
  products: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {

  switch (action.type) {
    case ALLPRODUCTS:
    case ALLPRODUCTSBYCATEGORY:
    case PRODUCTBYPRODUCTNAME:
      console.log("GET prod, ",initialState)
      return {
       
        ...initialState,
        category: action.category,
        products: action.products
      }
    default:
      return state;
  }

};