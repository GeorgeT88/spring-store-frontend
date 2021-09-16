import axios from "axios";

const ALLPRODUCTSBYCATEGORY = "allProductsByCategory";
const ALLPRODUCTS = "allProducts";



export const getAllProducts = () => async (dispatch) => {
    const response = await axios.get('http://localhost:8081/getAllProducts')
    dispatch({type: ALLPRODUCTS, payload: response.data});
  }


export const getAllProductsByCategory = (category) => async (dispatch) => {
    const response = await axios.get(`http://localhost:8081/getByProductCategory/${category}`)
    dispatch({type: ALLPRODUCTSBYCATEGORY, payload: response.data})
  }

const initalState = {
  products: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initalState, action) => {

  switch (action.type) {
    case ALLPRODUCTS: {
      return action.payload;
    }
    case ALLPRODUCTSBYCATEGORY: {
      return action.payload;
    }
    default:
      return state;
  }
};