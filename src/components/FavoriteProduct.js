import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { setProduct } from "../redux/actions/productActions";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import { removeProductFromFavorites } from '../../src/redux/actions/favoriteProductActions';
import Button from '@material-ui/core/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { removeProductfromFavoritesLocal } from '../../src/redux/actions/favoriteLocalProductActions';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const FavoriteProduct = (product) => {

  const dispatch = useDispatch();
  let history = useHistory();
  const { productPhotoLink, productName, productPrice } = product;
  const loggedIn = useSelector((state) => state.loggedIn);


  const handleProductPage = () => {
    dispatch(setProduct(product));
    history.push(`/productPage`);

  }

  const handleClickRemoveProductFromFavorites = () => {
    if (loggedIn === true) {
      dispatch(
        removeProductFromFavorites(product.productName)
      );
    } else {
      dispatch(
        removeProductfromFavoritesLocal(product)
      );
    }
  };



  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>

      <Grid container spacing={2} style={{ border: "1px solid grey" }}  >
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }} onClick={() => handleProductPage()}>
            <Img alt="complex" src={productPhotoLink} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={3}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 600 }}>
                Product
              </Typography>
              <Typography variant="body2" gutterBottom>
                {productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Product price: {productPrice}
              </Typography>
              <Grid   >
                <Button onClick={() => handleClickRemoveProductFromFavorites()} style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px' }} startIcon={<ClearIcon />}> {'Remove'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>


  );
}

export default FavoriteProduct;