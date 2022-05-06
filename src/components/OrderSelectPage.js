import React from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OrderAddressPage from './OrderAddressPage';
import OrderPaymentPage from './OrderPaymentPage';
import OrderReviewPage from './OrderReviewPage';
import OrderCheckoutPage from './OrderCheckoutPage';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.springwebstore.com/">
        springwebstore.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}





const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <OrderAddressPage />;
    case 1:
      return <OrderPaymentPage />;
    case 2:
      return <OrderReviewPage />;
    case 3:
      return <OrderCheckoutPage />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function OrderSelectPage() {

  const orderStep = useSelector((state) => state.orderStep.orderStep);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" >
            Checkout
          </Typography>
          <Stepper activeStep={orderStep} sx={{ pt: 3, pb: 5 }} >
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel  >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              {getStepContent(orderStep)}
            </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}