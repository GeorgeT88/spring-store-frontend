const APPBARFALSE = "APPBARFALSE";
const APPBARTRUE = "APPBARTRUE";

export const appBarFalse = () => ({
  type: APPBARFALSE,
});

export const appBarTrue = () => ({
  type: APPBARTRUE,
});

const initialState = {
  appbar: true,
};

const secondaryAppBar = (state = initialState, action) => {
  switch (action.type) {
    case APPBARFALSE: {
      return { ...state, appbar: false };
    }
    case APPBARTRUE: {
      return { ...state, appbar: true };
    }
    default:
      return state;
  }
};
export default secondaryAppBar;
