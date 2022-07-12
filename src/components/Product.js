import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { setProduct } from "../redux/actions/productActions";
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from "../../src/redux/actions/favoriteProductActions";
import { addProductToCart } from "../../src/redux/actions/cartActions";
import { addProductToLocalCart } from "../../src/redux/actions/cartLocalActions";
import {
  addProductToFavoritesLocal,
  removeProductfromFavoritesLocal,
} from "../../src/redux/actions/favoriteLocalProductActions";
import { red } from "@mui/material/colors";
import styled, { ThemeProvider } from "styled-components";
import NoSsr from "@material-ui/core/NoSsr";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { grey, indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
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
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${theme.palette.primary.main};
    transform: scale(1.07);
  }
  `}
`;

const Product = (product) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const { photoLink, name, description, price } = product;
  const favoriteProducts = useSelector(
    (state) => state.favoriteProduct.products
  );
  const favoriteLocalProducts = useSelector(
    (state) => state.favoriteLocalProduct.products
  );
  const productsInCart = useSelector((state) => state.cart.entries);
  const productsInCartLocal = useSelector((state) => state.cartLocal.products);
  const token = localStorage.getItem("token");
  const [clicked, setClicked] = useState(false);
  const [clickedLocal, setClickedLocal] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [cartClickedLocal, setCartClickedLocal] = useState(false);
  const handleProductPage = () => {
    dispatch(setProduct(product));
    history.push(`/productPage`);
  };

  useEffect(() => {
    if (token) {
      if (
        productsInCart.length !== 0 &&
        productsInCart.some((p) => p.productName === product.name)
      ) {
        setCartClicked(true);
      } else {
        setCartClicked(false);
      }
    } else {
      if (
        productsInCartLocal.length !== 0 &&
        productsInCartLocal.some((p) => p.name === product.name)
      ) {
        setCartClickedLocal(true);
      } else {
        setCartClickedLocal(false);
      }
    }
  }, [token, productsInCart, productsInCartLocal, product.name]);

  useEffect(() => {
    if (token) {
      if (favoriteProducts.some((p) => p.name === product.name)) {
        setClicked(true);
      } else {
        setClicked(false);
      }
    } else {
      if (favoriteLocalProducts.some((p) => p.name === product.name)) {
        setClicked(true);
      } else {
        setClicked(false);
      }
    }
  }, [token, favoriteLocalProducts, favoriteProducts, product.name]);

  const handleClick = () => {
    if (token) {
      if (!clicked) {
        setClicked(true);
        dispatch(addProductToFavorites(product.name));
      } else {
        setClicked(false);
        dispatch(removeProductFromFavorites(product.name));
      }
    } else {
      if (!clickedLocal) {
        setClicked(true);
        dispatch(addProductToFavoritesLocal(product));
      } else {
        setClickedLocal(false);
        dispatch(removeProductfromFavoritesLocal(product));
      }
    }
  };

  const handleClickCart = () => {
    if (token) {
      if (!cartClicked) {
        setCartClicked(true);
        dispatch(addProductToCart(product.name, 1));
      }
    } else {
      if (!cartClickedLocal) {
        setCartClickedLocal(true);
        dispatch(addProductToLocalCart(product, 1));
      }
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <NoSsr>
        <MuiThemeProvider theme={customTheme}>
          <ThemeProvider theme={customTheme}>
            <StyledCard className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={photoLink}
                onClick={() => handleProductPage()}
              />
              <CardContent
                className={classes.cardContent}
                onClick={() => handleProductPage()}
              >
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography>{`Description: ${description}`}</Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  {`Product price:  ${price}`}
                </Typography>
              </CardContent>
              <CardActions>
                {token ? (
                  cartClicked ? (
                    <Grid>
                      <Button
                        onClick={() => handleClickCart()}
                        variant="primary"
                        style={{
                          maxWidth: "300px",
                          maxHeight: "30px",
                          minWidth: "30px",
                          minHeight: "30px",
                          fontSize: "11px",
                          backgroundColor: "#3f51b5",
                          color: "#FFFFFF",
                        }}
                        startIcon={<ShoppingCartIcon />}
                      >
                        {" "}
                        {"Prod. in Cart"}
                      </Button>
                    </Grid>
                  ) : (
                    <Grid>
                      <Button
                        onClick={() => handleClickCart()}
                        variant="primary"
                        style={{
                          maxWidth: "300px",
                          maxHeight: "30px",
                          minWidth: "30px",
                          minHeight: "30px",
                          fontSize: "11px",
                          backgroundColor: "#eeeeee",
                        }}
                        startIcon={<AddShoppingCartIcon />}
                      >
                        {" "}
                        {"Add to Cart"}
                      </Button>
                    </Grid>
                  )
                ) : cartClickedLocal ? (
                  <Grid>
                    <Button
                      onClick={() => handleClickCart()}
                      variant="primary"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "30px",
                        minWidth: "30px",
                        minHeight: "30px",
                        fontSize: "11px",
                        backgroundColor: "#3f51b5",
                        color: "#FFFFFF",
                      }}
                      startIcon={<ShoppingCartIcon />}
                    >
                      {" "}
                      {"Prod. in Cart"}
                    </Button>
                  </Grid>
                ) : (
                  <Grid>
                    <Button
                      onClick={() => handleClickCart()}
                      variant="primary"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "30px",
                        minWidth: "30px",
                        minHeight: "30px",
                        fontSize: "11px",
                        backgroundColor: "#eeeeee",
                      }}
                      startIcon={<AddShoppingCartIcon />}
                    >
                      {" "}
                      {"Add to Cart"}
                    </Button>
                  </Grid>
                )}
                {clicked ? (
                  <IconButton color="default" onClick={() => handleClick()}>
                    <FavoriteIcon style={{ color: red[500] }} />
                  </IconButton>
                ) : (
                  <IconButton color="default" onClick={() => handleClick()}>
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
              </CardActions>
            </StyledCard>
          </ThemeProvider>
        </MuiThemeProvider>
      </NoSsr>
    </Grid>
  );
};

export default Product;
