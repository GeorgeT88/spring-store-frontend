
import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const axios = require('axios').default;
const ACCESS_TOKEN = "access_token";

function SignIn() {



    function handleLogin(username, password) {
        axios.post('http://localhost:8762/login', {
            username: username,
            password: password
        }).then((response) => {
            localStorage.setItem(ACCESS_TOKEN, response.headers.authorization);
            console.log(response.headers.authorization);
        }).catch((error) => {
            console.log(error)
        })
    }


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <React.Fragment>


            <form noValidate autoComplete="off">
                <div>
                    <TextField id="username" label="Username" onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <TextField id="password" label="Password" onChange={e => setPassword(e.target.value)} />
                </div>
            </form>
            <Button variant="contained" color="primary" onClick={() => handleLogin(username, password)}>Login</Button>


        </React.Fragment>
    );


}
export default SignIn;