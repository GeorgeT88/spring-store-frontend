const ADD_PRODUCT_TO_FAVORITES_LIST = "ADD_PRODUCT_TO_FAVORITES_LIST";
const REMOVE_PRODUCT_TO_FAVORITES_LIST = "REMOVE_PRODUCT_TO_FAVORITES_LIST";




export const addProductToFavoritesLocal = (product) =>(
    {
      type: ADD_PRODUCT_TO_FAVORITES_LIST,
      product:product
  }
  )
  export const removeProductfromFavoritesLocal = (product) =>(
    {
      type: REMOVE_PRODUCT_TO_FAVORITES_LIST,
      product:product
  }
  )

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