import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProduct } from "../redux/actions/productActions";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuItem from '@material-ui/core/MenuItem';
import Image from 'material-ui-image';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { removeProductToFavorites } from '../../src/redux/actions/favoriteProductActions';



import NoSsr from '@material-ui/core/NoSsr';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { grey, indigo } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(220),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {

    height: '50%',
    display: 'flex',
    flexDirection: 'row',
  },
  cardContent: {
    flexGrow: 2,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(12),
  },
}));

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

  const handleClick = () => {
    dispatch(
      removeProductToFavorites(product.productName)
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
            <IconButton color="default" onClick={() => history.push('/cartPage')} >
              <ShoppingCartIcon fontSize="small" />
            </IconButton>
            <IconButton  onClick={() => handleClick()}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>


);
}

export default FavoriteProduct;