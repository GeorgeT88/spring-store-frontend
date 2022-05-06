const SET_ORDER_ADDRESS = "SET_ORDER_ADDRESS";
const GET_ORDER_ADDRESS = "GET_ORDER_ADDRESS";
const CLEAR_ORDER_ADDRESS = "CLEAR_ORDER_ADDRESS";

export const setOrderAddress = (firstName,lastName,addressLine1 ,addressLine2,city,state,zipPostalCode,country) => (
  {
    type: SET_ORDER_ADDRESS,
    firstName: firstName,
    lastName: lastName,
    addressLine1: addressLine1,
    addressLine2: addressLine2,
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
  addressLine1: null,
  addressLine2: null,
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
        addressLine1: action.addressLine1,
        addressLine2: action.addressLine2,
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