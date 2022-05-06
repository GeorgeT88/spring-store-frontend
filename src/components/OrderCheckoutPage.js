import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setOrderStep } from "../redux/actions/orderStepActions";
import { clearOrderCreditCardInfo } from "../redux/actions/orderCreditCardInfoActions";
import { clearOrderAddress } from "../redux/actions/orderAddressActions";
import { useHistory } from 'react-router-dom';

const theme = createTheme();

export default function OrderCheckoutPage() {
  const dispatch = useDispatch();
  let history = useHistory();
  const orderStep = useSelector((state) => state.orderStep.orderStep);


  const handleBackToMainPage = () => {
    dispatch(setOrderStep(0));
    dispatch(clearOrderCreditCardInfo());
    dispatch(clearOrderAddress());

    history.push(`/`);
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
          <React.Fragment>         
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {orderStep}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link href="#" variant="body2" onClick={() => handleBackToMainPage()}
                 >
                    {'Go back to the main page'}
                  </Link>
                </Box>
              </React.Fragment>
          </React.Fragment>   
    </ThemeProvider>
  );
}