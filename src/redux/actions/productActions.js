const SET_PRODUCT = "SET_PRODUCT";
const GET_PRODUCT = "GET_PRODUCT";


export const setProduct = (product) =>(
  {
    type: SET_PRODUCT,
    id: product.id,
    productName: product.productName,
    productDescription: product.productDescription,
    productPrice: product.productPrice,
    productPhotoLink: product.productPhotoLink
    
}

)


export const getProduct = () =>({
  type: GET_PRODUCT,
})

const initialState = {
  id: null,
  productName: null,
  productDescription: null,
  productPrice: null,
  productPhotoLink: null
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initialState, action) => {
  
    switch (action.type) {
      case SET_PRODUCT:
        console.log("AACTIOON SET",action);
        return {
            ...initialState,
            id: action.id,
            productName: action.productName,
            productDescription: action.productDescription,
            productPrice: action.productPrice,
            productPhotoLink: action.productPhotoLink    
        }
      case GET_PRODUCT:
        console.log("AACTIOON GET",action);
          return {...state}
      default:
        return state;
    }
  };