const LOGGED_TRUE = "LOGGED_TRUE";
const LOGGED_FALSE = "LOGGED_FALSE";

export const loggedTrue  = () =>({
    type: LOGGED_TRUE
})


export const loggedFalse = () =>({
  type: LOGGED_FALSE
})

const initalState = {
    logged: false
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initalState, action) => {
  
    switch (action.type) {
      case LOGGED_TRUE: {    
        return {...state, logged: true };
      }
      case LOGGED_FALSE: {
        return {...state, logged: false };
      }
      default:
        return state;
    }
  };