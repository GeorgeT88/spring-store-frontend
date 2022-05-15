import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProduct } from "../redux/actions/productActions";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import { removeProductFromCart } from '../redux/actions/cartActions';
import { removeProductfromLocalCart } from '../redux/actions/cartLocalActions';
import Button from '@material-ui/core/Button';
import ClearIcon from '@mui/icons-material/Clear';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Cart = (product) => {


  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  let history = useHistory();
  const { productDto, quantity } = product;


  const handleProductPage = () => {
    if (token){
    dispatch(setProduct(productDto));
    history.push(`/productPage`);
  }else{
    dispatch(setProduct(product));
    history.push(`/productPage`);
  }

  }


  
  const handleClickRemoveProductFromCart = () => {
    if (token){
    dispatch(
      removeProductFromCart(productDto.productName, 1)
    );
    }else{
      dispatch(
        removeProductfromLocalCart(product)
      ); 
    }
  };


  if (token) {
    return (
      <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>

        <Grid container spacing={2} style={{ border: "1px solid grey" }}  >
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }} onClick={() => handleProductPage()}>
              <Img alt="complex" src={productDto.productPhotoLink} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 600 }}>
                  Product
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {productDto.productName} quantity: {quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Product price: {productDto.productPrice}
                </Typography>
                <Grid   >
                  <Button onClick={() => handleClickRemoveProductFromCart(product.productDto.productName)} style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px' }} startIcon={<ClearIcon />}> {'Remove'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Paper>
    );
  } else {
    return (
      <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>

        <Grid container spacing={2} style={{ border: "1px solid grey" }}  >
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }} onClick={() => handleProductPage()}>
              <Img alt="complex" src={product.productPhotoLink} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 600 }}>
                  Product
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.productName} quantity: {product.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Product price: {product.productPrice}
                </Typography>
                <Grid   >
                  <Button onClick={() => handleClickRemoveProductFromCart()} style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px' }} startIcon={<ClearIcon />}> {'Remove'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default Cart;