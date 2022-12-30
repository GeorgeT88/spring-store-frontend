import axios from "axios";
import { toast } from "react-toastify";

const CREATE_NEW_ORDER = "CREATE_NEW_ORDER";

export const createNewOrder =
  (
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    city,
    state,
    zipPostalCode,
    country,
    entries
  ) =>
  async (dispatch, getState) => {
    const token = getState().auth.token;

    if (token) {
      const response = await axios.post(
        process.env.REACT_APP_CREATE_ORDER,
        {
          firstName,
          lastName,
          addressLine1,
          addressLine2,
          city,
          state,
          zipPostalCode,
          country,
          entries
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch({
        type: CREATE_NEW_ORDER,
        uuid: response.data.uuid,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        addressLine1: response.data.addressLine1,
        addressLine2: response.data.addressLine2,
        city: response.data.city,
        state: response.data.state,
        zipPostalCode: response.data.zipPostalCode,
        country: response.data.country,
        entries: response.data.entries
      });
      toast.success("Succesfully created new order!", {
        position: "top-right",
      });
    } else return null;
  };

const initialState = {
  uuid: null,
  firstName: null,
  lastName: null,
  addressLine1: null,
  addressLine2: null,
  city: null,
  state: null,
  zipPostalCode: null,
  country: null,
  entries: null
};

const orderCheckoutActions = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_ORDER:
      return {
        ...initialState,
        uuid: action.uuid,
        firstName: action.firstName,
        lastName: action.lastName,
        setAddressLine1: action.setAddressLine1,
        setAddressLine2: action.setAddressLine2,
        city: action.city,
        state: action.state,
        zipPostalCode: action.zipPostalCode,
        entries: action.entries
      };
    default:
      return state;
  }
};

export default orderCheckoutActions;
