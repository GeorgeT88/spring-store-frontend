
import React, { } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { updateProductToCart } from '../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { removeProductFromCart } from '../redux/actions/cartActions';
import { useHistory } from 'react-router-dom';
import { setOrderStep } from "../redux/actions/orderStepActions";


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});



const CartPage = () => {
  let history = useHistory();
  const productsInCart = useSelector((state) => state.cart.productsInCartList);
  const productsInCartLocal = useSelector((state) => state.cartLocal.products);
  const cart = useSelector((state) => state.cart);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const handleProductQuantity = (productName, quantity) => {
    dispatch(updateProductToCart(productName, quantity));
    console.log('update', quantity);
  }

  const handleClickRemoveProductFromCart = (productName) => {
    dispatch(
      removeProductFromCart(productName, 1)
    );
  };

  const handlekOrderStep = () => {
    dispatch(setOrderStep(0));
    history.push(`/orderSelectPage`);
  }

  if (token) {
    return (
      <Paper sx={{ p: 5, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>

        {productsInCart.length !== 0 && (
          <Typography display="flex" justifyContent="center" gutterBottom variant="h5" >
            Cart
          </Typography>
        )}

        {productsInCart.length !== 0 && (
          <Typography display="flex" justifyContent="flex-end" gutterBottom variant="h6" component="div">
            Total : {cart.total}
          </Typography>
        )}
        {productsInCart.length === 0 && (
          <Typography display="flex" justifyContent="center" gutterBottom variant="h6" component="div">
            Cart is Empty!
          </Typography>
        )}
        {productsInCart.length !== 0 && productsInCart.map((product) => (
          <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={product.productDto.productPhotoLink} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      {product.productDto.productName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {product.productDto.productDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Product Price: {product.productDto.productPrice}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                      Products  :
                      <Select
                        sx={{
                          height: 30,
                          width: 57
                        }}
                        value={product.quantity - 1}
                      >
                        {[...Array(product.productDto.productStock !== 0 && product.productDto.productStock)].map((e, i) => {
                          return <MenuItem value={i} onClick={() => handleProductQuantity(product.productDto.productName, i + 1)}>
                            {i + 1}
                          </MenuItem>
                        })}
                      </Select>
                    </Typography>
                    <Grid   >
                      <Button onClick={() => handleClickRemoveProductFromCart(product.productDto.productName)} style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px' }} startIcon={<ClearIcon />}> {'Remove'}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    Product price : {product.productTotalPrice}
                  </Typography>
                </Grid>
                <Grid >
                </Grid>
              </Grid>
            </Grid>
          </Paper>

        ))}
        <p></p>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handlekOrderStep}
            type="submit"

            sx={{ mt: 3, ml: 1 }}
            variant="primary" style={{ backgroundColor: "#3f51b5", color: '#FFFFFF' }}>
            order
          </Button>
        </Box>
      </Paper>
    );
  } else return (
    <Paper sx={{ p: 5, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>

      {productsInCartLocal.length !== 0 && (
        <Typography display="flex" justifyContent="center" gutterBottom variant="h5" >
          Cart
        </Typography>
      )}

      {productsInCartLocal.length !== 0 && (
        <Typography display="flex" justifyContent="flex-end" gutterBottom variant="h6" component="div">
          Total : {cart.total}
        </Typography>
      )}
      {productsInCartLocal.length === 0 && (
        <Typography display="flex" justifyContent="center" gutterBottom variant="h6" component="div">
          Cart is Empty!
        </Typography>
      )}
      {productsInCartLocal.length !== 0 && productsInCartLocal.map((product) => (
        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src={product.productPhotoLink} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {product.productDescription}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product Price: {product.productPrice}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ cursor: 'pointer' }} variant="body2">
                    Products  :
                    <Select
                      sx={{
                        height: 30,
                        width: 57
                      }}
                      value={product.quantity - 1}
                    >
                      {[...Array(product.productStock !== 0 && product.productStock)].map((e, i) => {
                        return <MenuItem value={i} onClick={() => handleProductQuantity(product.productName, i + 1)}>
                          {i + 1}
                        </MenuItem>
                      })}
                    </Select>
                  </Typography>
                  <Grid   >
                    <Button onClick={() => handleClickRemoveProductFromCart(product.productName)} style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px' }} startIcon={<ClearIcon />}> {'Remove'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  Product price : {product.productTotalPrice}
                </Typography>
              </Grid>
              <Grid >
              </Grid>
            </Grid>
          </Grid>
        </Paper>

      ))}
      <p></p>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handlekOrderStep}
          type="submit"

          sx={{ mt: 3, ml: 1 }}
          variant="primary" style={{ backgroundColor: "#3f51b5", color: '#FFFFFF' }}>
          order
        </Button>
      </Box>
    </Paper>
  );
}

export default CartPage;