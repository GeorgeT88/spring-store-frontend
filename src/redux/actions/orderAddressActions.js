const SET_ORDER_ADDRESS = "SET_ORDER_ADDRESS";
const GET_ORDER_ADDRESS = "GET_ORDER_ADDRESS";
const CLEAR_ORDER_ADDRESS = "CLEAR_ORDER_ADDRESS";

export const setOrderAddress = (firstName,lastName,adressLine1,adressLine2,city,state,zipPostalCode,country) => (
  {
    
    type: SET_ORDER_ADDRESS,
    firstName: firstName,
    lastName: lastName,
    adressLine1: adressLine1,
    adressLine2: adressLine2,
    city: city,
    state: state,
    zipPostalCode: zipPostalCode,
    country: country
  }
)

export const getOrderAddress = () => ({
  type: GET_ORDER_ADDRESS,
})


export const clearOrderAddress = () => (
  {
    type: CLEAR_ORDER_ADDRESS
  }
)

const initialState = {
  firstName: null,
  lastName: null,
  adressLine1: null,
  adressLine2: null,
  city: null,
  state: null,
  zipPostalCode: null,
  country: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {

  switch (action.type) {
    
    case SET_ORDER_ADDRESS:
      return {
        ...initialState,
        firstName: action.firstName,
        lastName: action.lastName,
        adressLine1: action.adressLine1,
        adressLine2: action.adressLine2,
        city: action.city,
        state: action.state,
        zipPostalCode: action.zipPostalCode,
        country: action.country
      }
    case GET_ORDER_ADDRESS:
      return { ...state }
    case CLEAR_ORDER_ADDRESS:
      return initialState 
    default:
      return state;
  }
};