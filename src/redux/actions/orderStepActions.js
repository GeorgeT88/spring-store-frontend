const SET_ORDER_STEP = "SET_ORDER_STEP";
const GET_ORDER_STEP = "GET_ORDER_STEP";

export const setOrderStep = (orderStep) => (
  {
    
    type: SET_ORDER_STEP,
    orderStep: orderStep,

  }
)

export const getOrderStep = () => ({
  type: GET_ORDER_STEP,
})

const initialState = {
  orderStep: 0,

}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {

  switch (action.type) {
    
    case SET_ORDER_STEP:
      return {
        ...initialState,
        orderStep: action.orderStep,
      }
    case GET_ORDER_STEP:
      return { ...state }
    default:
      return state;
  }
};