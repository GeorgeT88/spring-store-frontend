import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const CREATE_NEW_ORDER = "CREATE_NEW_ORDER";




export const createNewOrder = (firstName, lastName, addressLine1, addressLine2, city, state, zipPostalCode, country, nameOnCard, cardNumber, expiryDate, cvv) => async (dispatch, getState) => {

    const token = getState().auth.token;

    if (token) {
        const emailUser = jwtDecode(token);
        const response = await axios
            .post(`http://localhost:8762/order/createNewOrder?email=${emailUser.sub}`, {
                firstName,
                lastName,
                addressLine1,
                addressLine2,
                city,
                state,
                zipPostalCode,
                country,
                nameOnCard,
                cardNumber,
                expiryDate,
                cvv
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
        dispatch({
            type: CREATE_NEW_ORDER,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            addressLine1: response.data.addressLine1,
            addressLine2: response.data.addressLine2,
            city: response.data.city,
            state: response.data.state,
            zipPostalCode: response.data.zipPostalCode,
            country: response.data.country,
            nameOnCard: response.data.nameOnCard,
            cardNumber: response.data.cardNumber,
            expiryDate: response.data.expiryDate,
            cvv: response.data.cvv

        });
        toast.success("Succesfully created new order!", { position: "top-right" })

    } else return null;

};

const initialState = {
    firstName: null,
    lastName: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    state: null,
    zipPostalCode: null,
    country: null,
    nameOnCard: null,
    cardNumber: null,
    expiryDate: null,
    cvv: null
};



const authActions = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_ORDER:
            return {
                ...initialState,
                firstName: action.firstName,
                lastName: action.lastName,
                setAddressLine1: action.setAddressLine1,
                setAddressLine2: action.setAddressLine2,
                city: action.city,
                state: action.state,
                zipPostalCode: action.zipPostalCode,
                country: action.country,
                nameOnCard: action.nameOnCard,
                expiryDate: action.expiryDate,
                cvv: action.cvv
            };
        default:
            return state;
    }
};

export default authActions;
