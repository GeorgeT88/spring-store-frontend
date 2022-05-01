import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const CREATE_NEW_ORDER = "CREATE_NEW_ORDER";




export const createNewOrder = (firstName, lastName, setAddressLine1, setAddressLine2, city, state, zipPostalCode, country, nameOnCard, cardNumber, expiryDate, cvv, status, productList, user, total) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;

        if (token) {
            const emailUser = jwtDecode(token);
            axios
                .post(`localhost:8762/order/createNewOrder/getUserByEmail?email=${emailUser.sub}`, {
                    firstName,
                    lastName,
                    setAddressLine1,
                    setAddressLine2,
                    city,
                    state,
                    zipPostalCode,
                    country,
                    nameOnCard,
                    cardNumber,
                    expiryDate,
                    cvv,
                    status,
                    productList,
                    user,
                    total
                }).then((response) => {
                    dispatch({
                        type: CREATE_NEW_ORDER,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        setAddressLine1: response.data.setAddressLine1,
                        setAddressLine2: response.data.setAddressLine2,
                        city: response.data.city,
                        state: response.data.state,
                        zipPostalCode: response.data.zipPostalCode,
                        country: response.data.country,
                        nameOnCard: response.data.nameOnCard,
                        cardNumber: response.data.cardNumber,
                        expiryDate: response.data.expiryDate,
                        cvv: response.data.cvv,
                        status: response.data.status,
                        productList: response.data.productList,
                        user: response.data.user,
                        total: response.data.total
                    });
                    toast.success("Succesfully created new order!", { position: "top-right" })
                })
        } else return null;
    };
};

const initialState = {
    token: localStorage.getItem("token"),
    type: CREATE_NEW_ORDER,
    firstName: null,
    lastName: null,
    setAddressLine1: null,
    setAddressLine2: null,
    city: null,
    state: null,
    zipPostalCode: null,
    country: null,
    nameOnCard: null,
    cardNumber: null,
    expiryDate: null,
    cvv: null,
    status: null,
    productList: null,
    user: null,
    total: null
};



const authActions = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_ORDER:
            return {
                ...initialState,
                token: localStorage.getItem('token'),
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
                cvv: action.cvv,
                status: action.status,
                productList: action.productList,
                user: action.user,
                total: action.total
            };
        default:
            return state;
    }
};

export default authActions;
