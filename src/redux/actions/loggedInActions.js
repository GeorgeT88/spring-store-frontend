const LOGGED_IN_FALSE = "LOGGED_IN_FALSE";
const LOGGED_IN_TRUE = "LOGGED_IN_TRUE";

export const loggedInFalse = () =>({
    type: LOGGED_IN_FALSE
})


export const loggedInTrue = () =>({
  type: LOGGED_IN_TRUE
})

const initalState = {
    loggedIn: false
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initalState, action) => {
  
    switch (action.type) {
      case LOGGED_IN_FALSE: {
        return {...state, loggedIn: false };
      }
      case LOGGED_IN_TRUE: {
        return {...state, loggedIn: true };
      }
      default:
        return state;
    }
  };