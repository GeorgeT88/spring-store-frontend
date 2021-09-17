import React, { useState,useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { appBarFalse,appBarTrue }from "../redux/actions/secondaryAppBar";

const axios = require('axios').default;
const ACCESS_TOKEN = "access_token";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/" to='/'>
        Spring Store App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function handleSignIn(username, password) {
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

 function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch (appBarFalse());
    return () => {
      dispatch (appBarTrue());
    }     
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        <p>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSignIn(email)}       
          >
           Reset Password
          </Button>
            <Grid item xs>
              <Link href="#" variant="body2" to= '/signIn'>
                Rememberd the password? Go back to Sign in!
              </Link>
            </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default ForgotPassword;