
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import ClearIcon from '@mui/icons-material/Clear';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { addProductToCart } from '../redux/actions/cartActions';
import { removeProductFromFavorites } from '../redux/actions/favoriteProductActions';
import { removeProductfromFavoritesLocal } from '../../src/redux/actions/favoriteLocalProductActions';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});



const FavoriteProductPage = (product) => {

  const dispatch = useDispatch();
  const productsInCart = useSelector((state) => state.cart.entries);
  const token = localStorage.getItem('token');
  const [cartClicked, setCartClicked] = useState(false);



  useEffect(() => {
    if (productsInCart.length !== 0 && productsInCart.some(p => (p.name === product.name))) {
      setCartClicked(true);
    }
    else {
      setCartClicked(false)
    }
  }, [productsInCart, product.name]);





  const handleClickCart = () => {
    if (cartClicked === false) {
      setCartClicked(true)
      dispatch(
        addProductToCart(product.name, 1)
      );
    }
  }



  const handleClickRemoveProductFromFavorites = (product) => {
    if (token) {
      dispatch(
        removeProductFromFavorites(product.name)
      );
    } else {
      dispatch(
        removeProductfromFavoritesLocal(product)
      );
    }
  };



  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={product.photoLink} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={3}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {product.description}
              </Typography>

              {cartClicked !== true && (
                <Grid  >
                  <Button onClick={() => handleClickCart()} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#eeeeee" }} startIcon={<AddShoppingCartIcon />}> {'Add to Cart'}</Button>
                </Grid>
              )}
              {cartClicked === true && (
                <Grid  >
                  <Button onClick={() => handleClickCart()} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#3f51b5", color: '#FFFFFF' }} startIcon={<ShoppingCartIcon />}> {'Prod. in Cart'}</Button>
                </Grid>
              )}


              <Grid   >
                <Button onClick={() => handleClickRemoveProductFromFavorites(product)} style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px' }} startIcon={<ClearIcon />}> {'Remove'}
                </Button>
              </Grid>
            </Grid>

          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Product price : {product.price}
            </Typography>
          </Grid>
          <Grid >
          </Grid>
        </Grid>
      </Grid>
    </Paper>




  );
}

export default FavoriteProductPage;