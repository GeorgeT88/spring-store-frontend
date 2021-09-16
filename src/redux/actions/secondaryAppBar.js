const APPBARFALSE = "APPBARFALSE";
const APPBARTRUE = "APPBARTRUE";

export const appBarFalse = () =>({
    type: APPBARFALSE
})


export const appBarTrue = () =>({
  type: APPBARTRUE
})

const initalState = {
    appbar: true
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initalState, action) => {
  
    switch (action.type) {
      case APPBARFALSE: {
        return {...state, appbar: false };
      }
      case APPBARTRUE: {
        return {...state, appbar: true };
      }
      default:
        return state;
    }
  };