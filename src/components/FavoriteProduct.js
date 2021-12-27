import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProduct } from "../redux/actions/productActions";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeProductFromFavorites } from '../../src/redux/actions/favoriteProductActions';
import Button from '@material-ui/core/Button';
import ClearIcon from '@mui/icons-material/Clear';


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


  const handleProductPage = () => {
    dispatch(setProduct(product));
    history.push(`/productPage`);

  }

  const handleClickRemoveProductFromFavorites = () => {
    dispatch(
      removeProductFromFavorites(product.productName)
    );
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