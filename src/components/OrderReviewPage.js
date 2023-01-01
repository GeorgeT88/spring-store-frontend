import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { setOrderStep } from "../redux/actions/orderStepActions";
import { createNewOrder } from "../redux/actions/orderCheckoutActions";

export default function OrderReviewPage() {
  const dispatch = useDispatch();
  const orderAddress = useSelector((state) => state).orderAddress;
  const cart = useSelector((state) => state.cart);

  const handleBackOrderStep = () => {
    dispatch(setOrderStep(1));
  };
  const handlekOrderStep = () => {
    dispatch(
        createNewOrder(
            orderAddress.firstName,
            orderAddress.lastName,
            orderAddress.addressLine1,
            orderAddress.addressLine2,
            orderAddress.city,
            orderAddress.state,
            orderAddress.zipPostalCode,
            orderAddress.country,
            cart.entries
        )
    );
    dispatch(setOrderStep(3));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.entries.map((product) => (
          <ListItem key={product.productName} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={
                product.productName + "   x " + product.quantity
              }
              secondary={product.description}
            />
            <Typography variant="body2">{product.price*product.quantity}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${cart.total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {orderAddress.firstName} {orderAddress.lastName}
          </Typography>
          <Typography gutterBottom>
            {orderAddress.adressLine1}, {orderAddress.adressLine2}
          </Typography>
          <Typography gutterBottom>
            {orderAddress.city}, {orderAddress.state}
          </Typography>
          <Typography gutterBottom>
            {orderAddress.zipPostalCode}, {orderAddress.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <Typography gutterBottom>Card type: Test-Visa</Typography>
            <Typography gutterBottom>Card holder: Test Name</Typography>
            <Typography gutterBottom>
              Card number: 1111-2222-3333-4444
            </Typography>
            <Typography gutterBottom>Expiry date: 01/27</Typography>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button sx={{ mt: 3, ml: 1 }} onClick={handleBackOrderStep}>
              Back
            </Button>
            <Button
              onClick={handlekOrderStep}
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              variant="contained"
              style={{ backgroundColor: "#3f51b5", color: "#FFFFFF" }}
            >
              order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
