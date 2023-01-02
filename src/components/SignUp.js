import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { appBarFalse, appBarTrue } from "../redux/actions/secondaryAppBar";
import { signUp } from "../../src/redux/actions/authActions";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/" to="/">
        Spring Store App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("First Name is required!")
      .matches("^[a-zA-Z][a-zA-Z\\s-]*$", "Only characters, dashes and spaces are allowed in this field")
      .min(4, "First Name has to be be at least 4 characters long!")
      .max(50, "First Name can not contain more than 50 characters!"),
    lastName: yup
      .string()
      .required("Last Name is required!")
      .matches("^[a-zA-Z][a-zA-Z\\s-]*$", "Only characters, dashes and spaces are allowed in this field")
      .min(3, "Last Name has to be be at least 3 characters long!")
      .max(50, "Last Name can not contain more than 50 characters!"),
    email: yup
      .string()
      .required("Email is required!")
      .matches(
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$",
        "Invalid Email!"
      )
      .min(8, "Email has to be be at least 8 characters long!")
      .max(100, "Email can not contain more than 100 characters!"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required!")
      .matches("^(?=(?:[07]){2})(?=[0-9]{10}).*", "Invalid Phone Number!")
      .min(10, "Phone Number has to be be at least 10 digits long!")
      .max(25, "Phone Number can not contain more than 25 digits!"),
    deliveryAddress: yup
      .string()
      .required("Delivery Address is required!")
      .matches(
        "^[a-zA-Z0-9 ]+$",
        "Only characters and digits are allowed in this field"
      )
      .min(8, "Delivery Address has to be be at least 8 characters!")
      .max(150, "Delivery Address can not contain more than 150 characters!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password has to be be at least 8 characters long!")
      .max(50, "Password can not contain max 50 characters!"),
    confirmPassword: yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match!"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      deliveryAddress: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      dispatch(
        signUp(
          values.firstName,
          values.lastName,
          values.email,
          values.phoneNumber,
          values.deliveryAddress,
          values.password
        )
      );
      history.push("/signIn");
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {
    dispatch(appBarFalse());
    return () => {
      dispatch(appBarTrue());
    };
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <p></p>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name*"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name*"
                name="lastName"
                autoComplete="lname"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address*"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="phoneNumber"
                label="Phone Number*"
                name="phoneNumber"
                autoComplete="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="deliveryAddress"
                label="Delivery Address*"
                name="deliveryAddress"
                autoComplete="deliveryAddress"
                value={formik.values.deliveryAddress}
                onChange={formik.handleChange}
                error={
                  formik.touched.deliveryAddress &&
                  Boolean(formik.errors.deliveryAddress)
                }
                helperText={
                  formik.touched.deliveryAddress &&
                  formik.errors.deliveryAddress
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password*"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Confirm Password*"
                type="password"
                id="confirmPassword"
                autoComplete="current-confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" to="/signIn">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default SignUp;
