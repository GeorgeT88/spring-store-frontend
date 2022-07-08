import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { setOrderAddress } from "../redux/actions/orderAddressActions";
import { setOrderStep } from "../redux/actions/orderStepActions";

const OrderAddressPage = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("First Name is required!")
      .matches("^[aA-zZ]+$", "Only characters are allowed in this field")
      .min(0, "First Name has to be be atleast 3 characters long!")
      .max(16, "First Name can not contain more than 16 characters!"),
    lastName: yup
      .string()
      .required("Last Name is required!")
      .matches("^[aA-zZ]+$", "Only characters are allowed in this field")
      .min(0, "Last Name has to be be atleast 3 characters long!")
      .max(16, "Last Name can not contain more than 16 characters!"),
    addressLine1: yup
      .string()
      .required("Delivery Address 1 is required!")
      .matches(
        "^[a-zA-Z0-9 ]+$",
        "Only characters and digits are allowed in this field"
      )
      .min(0, "Delivery Address has to be be atleast 8 characters!")
      .max(300, "Delivery Address 1 can not contain more than 300 characters!"),
    addressLine2: yup
      .string()
      .notRequired("Delivery Address 2 is not required!")
      .matches(
        "^[a-zA-Z0-9 ]+$",
        "Only characters and digits are allowed in this field"
      )
      .min(0, "Delivery Address has to be be atleast 8 characters!")
      .max(300, "Delivery Address 2 can not contain more than 300 characters!"),
    city: yup
      .string()
      .required("City is required!")
      .matches("^[aA-zZ]+$", "Only characters are allowed in this field")
      .min(0, "City has to be be atleast 3 characters long!")
      .max(25, "City can not contain more than 25 characters!"),
    state: yup
      .string()
      .required("State is required!")
      .matches("^[aA-zZ]+$", "Only characters are allowed in this field")
      .min(0, "State has to be be atleast 3 characters long!")
      .max(25, "State not contain more than 25 characters!"),
    zipPostalCode: yup
      .string()
      .required("Zip/Postal Code is required!")
      .matches(
        "^[a-zA-Z0-9 ]+$",
        "Only characters and digits are allowed in this field"
      )
      .min(0, "Zip/Postal Code has to be be atleast 2 characters!")
      .max(60, "Zip/Postal Code can not contain more than 60 characters!"),
    country: yup
      .string()
      .required("Country is required!")
      .matches("^[aA-zZ]+$", "Only characters are allowed in this field")
      .min(0, "Country has to be be atleast 3 characters long!")
      .max(25, "Country not contain more than 25 characters!"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipPostalCode: "",
      country: "",
    },
    onSubmit: (values) => {
      dispatch(
        setOrderAddress(
          values.firstName,
          values.lastName,
          values.addressLine1,
          values.addressLine2,
          values.city,
          values.state,
          values.zipPostalCode,
          values.country
        )
      );
      dispatch(setOrderStep(1));
    },
    validationSchema: validationSchema,
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
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
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="addressLine1"
              label="Address line 1*"
              name="addressLine1"
              autoComplete="addressLine1"
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              error={
                formik.touched.addressLine1 &&
                Boolean(formik.errors.addressLine1)
              }
              helperText={
                formik.touched.addressLine1 && formik.errors.addressLine1
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="addressLine2"
              label="Address line 2"
              name="addressLine2"
              autoComplete="addressLine2"
              value={formik.values.addressLine2}
              onChange={formik.handleChange}
              error={
                formik.touched.addressLine2 &&
                Boolean(formik.errors.addressLine2)
              }
              helperText={
                formik.touched.addressLine2 && formik.errors.addressLine2
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="city"
              label="City*"
              name="city"
              autoComplete="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="state"
              label="State/Province/Region*"
              name="state"
              autoComplete="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="zipPostalCode"
              label="Zip / Postal code*"
              name="zipPostalCode"
              autoComplete="zipPostalCode"
              value={formik.values.zipPostalCode}
              onChange={formik.handleChange}
              error={
                formik.touched.zipPostalCode &&
                Boolean(formik.errors.zipPostalCode)
              }
              helperText={
                formik.touched.zipPostalCode && formik.errors.zipPostalCode
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="country"
              label="Country*"
              name="country"
              autoComplete="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
        </Grid>
        <React.Fragment>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              variant="primary"
              style={{ backgroundColor: "#3f51b5", color: "#FFFFFF" }}
            >
              Next
            </Button>
          </Box>
        </React.Fragment>
      </form>
    </React.Fragment>
  );
};
export default OrderAddressPage;
