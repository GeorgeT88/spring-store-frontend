import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { appBarFalse, appBarTrue } from "../redux/actions/secondaryAppBar";
import { signUp } from "../redux/actions/authActions";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { setOrderCreditCardInfo } from "../redux/actions/orderCreditCardInfoActions";
import { setOrderStep } from "../redux/actions/orderStepActions";;





export default function Review() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state).products.products;
  const orderAddress = useSelector((state) => state).orderAddress;
  const orderCreditCardInfo = useSelector((state) => state).orderCreditCardInfo;

  const handleBackOrderStep = () => {
    dispatch(setOrderStep(1)); 

  }
  const handlekOrderStep = () => {
    
    dispatch(setOrderStep(3)); 

  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.productName} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.productName} secondary={product.productDescription} />
            <Typography variant="body2">{product.productPrice}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{orderAddress.firstName} {orderAddress.lastName}</Typography>
          <Typography gutterBottom>{orderAddress.adressLine1}, {orderAddress.adressLine2}</Typography>
          <Typography gutterBottom>{orderAddress.city}, {orderAddress.state}</Typography>
          <Typography gutterBottom>{orderAddress.zipPostalCode}, {orderAddress.country}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
       
          <Typography gutterBottom>Card type: Test-Visa</Typography>
          <Typography gutterBottom>Card holder: {orderCreditCardInfo.nameOnCard}</Typography>
          <Typography gutterBottom>Card number: {orderCreditCardInfo.cardNumber}</Typography>
          <Typography gutterBottom>Expiry date: {orderCreditCardInfo.expiryDate}</Typography>
         
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button sx={{ mt: 3, ml: 1 }} onClick={handleBackOrderStep}>
            Back
          </Button>
          <Button
            onClick={handlekOrderStep}
            type="submit"   
            sx={{ mt: 3, ml: 1 }} 
            variant = "primary"   
            style={{ backgroundColor: "#3f51b5" ,color: '#FFFFFF' }}>
            order
          </Button>
        </Box>
        </Grid>


      </Grid>
    </React.Fragment>
  );
}