const SET_PRODUCT = "SET_PRODUCT";
const GET_PRODUCT = "GET_PRODUCT";

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  photoLink: product.photoLink,
});

export const getProduct = () => ({
  type: GET_PRODUCT,
});

const initialState = {
  id: null,
  name: null,
  description: null,
  price: null,
  photoLink: null,
};

const productActions = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...initialState,
        id: action.id,
        name: action.name,
        description: action.description,
        price: action.price,
        photoLink: action.photoLink,
      };
    case GET_PRODUCT:
      return { ...state };
    default:
      return state;
  }
};

export default productActions;
