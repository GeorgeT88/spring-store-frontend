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

import styled, { ThemeProvider } from 'styled-components';
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

    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


const customTheme = createTheme({
  palette: {
    primary: {
      main: grey[50],
      secondary: indigo[500],
    },
  },
});


const StyledCard = styled(Card)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
  duration: theme.transitions.duration.standard,
})};
  &:hover {
    background-color: ${theme.palette.primary.main};
    transform: scale(1.07);
  }
  `}
`;

const FavoriteProduct = (product) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const { productPhotoLink, productName } = product;


  const handleProductPage = () => {
    console.log(product)
    dispatch(setProduct(product));
    history.push(`/productPage`);

  }


  return (





    <MenuItem
    
      className={classes.card}
      onClick={() => handleProductPage()}>
      

      <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          {productName }
          </Typography>
        </CardContent>
     
      <CardMedia
        style={{
          height: 0,
           paddingTop: '56.25%'}}
        image={productPhotoLink}

      />
       </Box>
    </Card>


    </MenuItem>




  )
}

export default FavoriteProduct;