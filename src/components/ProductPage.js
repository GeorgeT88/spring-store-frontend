import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { addProductToFavorites } from '../../src/redux/actions/favoriteProductActions';
import { removeProductFromFavorites } from '../../src/redux/actions/favoriteProductActions';
import Typography from '@mui/material/Container';
import { addProductToCart } from '../../src/redux/actions/cartActions';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Carousel } from 'react-carousel-minimal';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { addProductToFavoritesLocal } from '../../src/redux/actions/favoriteLocalProductActions';
import { removeProductfromFavoritesLocal } from '../../src/redux/actions/favoriteLocalProductActions';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(-1.5, 2.5, 2),
  },
}));


const ProductPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state) => state.favoriteProduct.productList);
  const favoriteLocalProducts = useSelector((state) => state.favoriteLocalProduct.products);
  const productsInCart = useSelector((state) => state.cart.productsInCartList);
  const product = useSelector((state) => state.product);
  const loggedIn = useSelector((state) => state.loggedIn);
  const [clicked, setClicked] = useState(false)
  const [cartClicked, setCartClicked] = useState(false);
  
  useEffect(() => {
    if (loggedIn === true) {
      if (favoriteProducts.some(p => (p.productName === product.productName))) {
        setClicked(true);
      }
      else {
        setClicked(false)
      }
    }
    else {
      if (favoriteLocalProducts.some(p => (p.productName === product.productName))) {
        setClicked(true);
      }
      else {
        setClicked(false)
      }
    }
  }, [loggedIn, favoriteLocalProducts, favoriteProducts, product.productName]);


  useEffect(() => {
    if (productsInCart.some(p => (p.productDto.productName === product.productName))) {
      setCartClicked(true);
    }
    else {
      setCartClicked(false)
    }
  }, [productsInCart, product.productName]);

  const handleFavoriteClick = () => {
    if (loggedIn === true) {
      if (clicked === false) {
        setClicked(true)
        dispatch(
          addProductToFavorites(product.productName)
        );
      } else {
        setClicked(false)
        dispatch(
          removeProductFromFavorites(product.productName)
        );
      }
    } else {
      if (clicked === false) {
        setClicked(true)
        dispatch(
          addProductToFavoritesLocal(product)
        );
      } else {
        setClicked(false)
        dispatch(
          removeProductfromFavoritesLocal(product)
        );
      }
    }
  }

  const handleClickCart = () => {
    if (cartClicked === false) {
      setCartClicked(true)
      dispatch(
        addProductToCart(product.productName, 1)
      );
    }
  }

  const data = [
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair yellow}",
    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair pink}",

    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair green}",

    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair blue}",

    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair silver}",

    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair purple}",

    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair orange}",

    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair azure}",

    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair brown}",

    }
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }


  return (




    <Grid sx={{ p: 5, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>

      <Carousel
        data={data}
        time={2000}
        width="850px"
        height="500px"
        captionStyle={captionStyle}
        radius="10px"
        slideNumber={true}
        slideNumberStyle={slideNumberStyle}
        captionPosition="bottom"
        automatic={false}
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
        thumbnails={true}
        thumbnailWidth="100px"
        style={{
          textAlign: "center",
          maxWidth: "850px",
          maxHeight: "500px",
          margin: "40px auto",
        }}
      />




      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="left"
            justify="center"
            style={{ minHeight: '3vh' }}
          >
            <Grid item xs={12}
            >



              <Typography component="h2" variant="h4">
                {product.productName}
              </Typography>
              <Typography component="h3" variant="h4">
                Description: {product.productDescription}
              </Typography>
              <Typography component="h3" variant="h4">
                Price: {product.productPrice}
              </Typography>

            </Grid>
            <Grid item xs={12}>
              {clicked !== true && (

                <Button onClick={() => handleFavoriteClick()} className={classes.submit} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#eeeeee" }} startIcon={<FavoriteBorderIcon />}> {'Add to Favorites'}</Button>

              )}
              {clicked === true && (

                <Button onClick={() => handleFavoriteClick()} className={classes.submit} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#eeeeee" }} startIcon={<FavoriteIcon sx={{ color: red[500] }} />}> {'Added to Favorites'}</Button>

              )}
              {cartClicked !== true && (

                <Button onClick={() => handleClickCart()} className={classes.submit} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#eeeeee" }} startIcon={<AddShoppingCartIcon />}> {'Add to Cart'}</Button>

              )}
              {cartClicked === true && (

                <Button className={classes.submit} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#3f51b5", color: '#FFFFFF' }} startIcon={<ShoppingCartIcon />}> {'Prod. in Cart'}</Button>

              )}
            </Grid>
          </Grid>


        </div>
      </Container>
    </Grid>






  );
};

export default ProductPage;