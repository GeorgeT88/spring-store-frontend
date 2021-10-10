import axios from "axios";

const SIGN_IN = "SIGN_IN";
const SIGN_UP = "SIGN_UP";
const USER_LOADED = "USER_LOADED";
const SIGN_OUT = "SIGN_OUT";



export const signUp = (firstName, lastName, email, password) => {
    return (dispatch) => {
        axios
            .post('http://localhost:8762/user/addUser', {
                firstName,
                lastName,
                email,
                password
            })
            .then((token) => {
                dispatch({
                    type: SIGN_UP,
                    token: token.data
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
};


export const signIn = (email, password) => async (dispatch) => {
await axios.post('http://localhost:8762/login', { email, password })
    .then((token) => {
        localStorage.setItem("token", token.headers.authorization)
        dispatch({type: SIGN_IN, token: token.headers.authorization});
     
  })
  await axios.get(`http://localhost:8762/user/getUserByEmail?email=${email}`,{
    headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
    }}).then((response) => {
        dispatch({
            type: SIGN_IN,
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
        });
    })
};





export const signOut = () => {
    return (dispatch) => {

        dispatch({
            type: SIGN_OUT,
        });

    };
};

export const loadUser = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        if (token) {
            dispatch({
                type: USER_LOADED,
                token,
            });
        } else return null;
    };
};

const initialState = {
    token: localStorage.getItem("token"),
    id: null,
    firstName: null,
    lastName: null,
    email: null,
};



const authActions = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
        case SIGN_UP:
        case USER_LOADED:
            return {
                ...initialState,
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
            };
        case SIGN_OUT:
            localStorage.removeItem("token");
            return {
                token: null,
                id: null,
                firstName: null,
                lastName: null,
                email: null,
            };
        default:
            console.log("INITIAL STATE", state);
            return state;
            
    }
};

export default authActions;