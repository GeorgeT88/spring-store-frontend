import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CartPage = () => {

  const productsInCart = useSelector((state) => state.cart.productsInCartList);


  return (


    <Paper sx={{ p: 5, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
      {productsInCart.map((product) => (
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
                    Add Products:
                    <Button>
                      Add
                    </Button>
                  </Typography>
                  <Typography sx={{ cursor: 'pointer' }} variant="body2">
                    Remove
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                {product.quantity} x: {product.productTotalPrice}
                </Typography>
              </Grid>
              <Grid >
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Paper>



  );
}

export default CartPage;