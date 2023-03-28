const SET_PRODUCT = "SET_PRODUCT";
const GET_PRODUCT = "GET_PRODUCT";

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  photoLinks: product.photoLinks,
});

export const getProduct = () => ({
  type: GET_PRODUCT,
});

const initialState = {
  id: null,
  name: null,
  description: null,
  price: null,
  photoLinks: [],
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
        photoLinks: action.photoLinks,
      };
    case GET_PRODUCT:
      return { ...state };
    default:
      return state;
  }
};

export default productActions;
