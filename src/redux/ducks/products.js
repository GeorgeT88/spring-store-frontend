import axios from "axios";

const ALLPRODUCTSBYCATEGORY = "allProductsByCategory";
const ALLPRODUCTS = "allProducts";



const allProductsLoaded = (products) => ({
  type: ALLPRODUCTS,
  payload: products,
});


export const getAllProducts = () => {
  return async dispatch => {
    const response = await axios.get('http://localhost:8081/getAllProducts')
    dispatch(allProductsLoaded(response.data))
  }
}

const allProductsLoadedByCategory = (products) => ({
  type: ALLPRODUCTSBYCATEGORY,
  payload: products,
});

export const getAllProductsByCategory = (category) => {
  return async dispatch => {
    const response = await axios.get(`http://localhost:8081/getByProductCategory/${category}`)
    dispatch(allProductsLoadedByCategory(response.data))
  }
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