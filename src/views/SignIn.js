import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const axios = require('axios').default;
const ACCESS_TOKEN = "access_token";

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value })
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value })
    }
    onSignIn(event) {
        axios.post('http://localhost:8762/login', {
            username: this.state.username,
            password: this.state.password
        }).then((response) => {
            localStorage.setItem(ACCESS_TOKEN, response.headers.authorization);
            console.log(response.headers.authorization);
        }).catch((error) => {
            console.log(error)
        })
    }
    onSignUp(event) { 
    }

    render() {
        return (
            <div>
                <h2>Sing In</h2>

                <form noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Username" value={this.state.username} onChange={this.handleChangeUsername} />
                    <TextField id="filled-basic" label="Password" value={this.state.password} onChange={this.handleChangePassword}/>
                </form>

                <Button variant="contained" color="primary" onClick={this.onSignIn}>Sign In</Button>
                <Button variant="outlined" color="primary" onClick={this.onSignUp}>Sign Up</Button>
            </div>
        );
    }
}

export default SignIn