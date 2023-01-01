const SET_ORDER_CREDITCARD_INFO = "SET_ORDER_CREDITCARD_INFO";
const GET_ORDER_CREDITCARD_INFO = "GET_ORDER_CREDITCARD_INFO";
const CLEAR_ORDER_CREDITCARD_INFO = "CLEAR_ORDER_CREDITCARD_INFO";

export const setOrderCreditCardInfo = (
  nameOnCard,
  cardNumber,
  expiryDate,
  cvv
) => ({
  type: SET_ORDER_CREDITCARD_INFO,
  nameOnCard: nameOnCard,
  cardNumber: cardNumber,
  expiryDate: expiryDate,
  cvv: cvv,
});

export const getOrderCreditCardInfo = () => ({
  type: GET_ORDER_CREDITCARD_INFO,
});

export const clearOrderCreditCardInfo = () => ({
  type: CLEAR_ORDER_CREDITCARD_INFO,
});

const initialState = {
  nameOnCard: null,
  cardNumber: null,
  expiryDate: null,
  cvv: null,
};

const orderCreditCardInfoActions = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_CREDITCARD_INFO:
      return {
        ...initialState,
        nameOnCard: action.nameOnCard,
        cardNumber: action.cardNumber,
        expiryDate: action.expiryDate,
        cvv: action.cvv,
      };
    case GET_ORDER_CREDITCARD_INFO:
      return { ...state };
    case CLEAR_ORDER_CREDITCARD_INFO:
      return initialState;
    default:
      return state;
  }
};

export default orderCreditCardInfoActions;
