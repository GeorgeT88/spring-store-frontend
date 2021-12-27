
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { updateProductToCart } from '../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { addProductToCart } from '../../src/redux/actions/cartActions';
import { removeProductFromFavorites } from '../../src/redux/actions/favoriteProductActions';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});



const FavoriteProductPage = () => {

  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state) => state.favoriteProduct.productList);
  const productsInCart = useSelector((state) => state.cart.productsInCartList);
  const [cartClicked, setCartClicked] = useState(false);

  const [prodName, setProdName] = useState('');


  useEffect(() => {

    if (productsInCart.length !== 0 && productsInCart.some(p => (p.productDto.productName === prodName))) {
      console.log("init", prodName)
      setCartClicked(true);
    }
    else {
      setCartClicked(false)
    }
  }, [productsInCart, prodName]);





  const handleClickAddToCart = (product) => {
    if (cartClicked === false) {
      setCartClicked(true)
      setProdName(product.productName)
      console.log("prodname: ", product.productName);
      dispatch(
        addProductToCart(product.productName, 1)
      );
    }
  }


  const handleClickRemoveProductFromFavorites = (product) => {
    dispatch(
      removeProductFromFavorites(product.productName)
    );
  };



  return (
    <Paper sx={{ p: 5, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>

      {favoriteProducts.length !== 0 && (
        <Typography display="flex" justifyContent="center" variant="h5" component="div" paragraph={true}>
          Favorite Product List
        </Typography>
      )}

      {favoriteProducts.length === 0 && (

        <Typography display="flex" justifyContent="center" gutterBottom variant="h6" component="div">
          Favorite Product List is empty!
        </Typography>
      )}

      {favoriteProducts.map((product) => (
        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src={product.productPhotoLink} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={3}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {product.productDescription}
                  </Typography>

                  {cartClicked !== true && (
                    <Grid>
                      <Button onClick={() => handleClickAddToCart(product)} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#eeeeee" }} startIcon={<AddShoppingCartIcon />}   > {'Add to Cart'}</Button>
                    </Grid>
                  )}
                  {cartClicked === true && (
                    <Grid  >
                      <Button variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#3f51b5", color: '#FFFFFF' }} startIcon={<ShoppingCartIcon />}> {'Prod. in Cart'}</Button>
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
                  Product price : {product.productPrice}
                </Typography>
              </Grid>
              <Grid >
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))
      }
    </Paper >



  );
}

export default FavoriteProductPage;