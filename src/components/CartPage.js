import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { updateProductToCart, removeProductFromCart,} from "../redux/actions/cartActions";
import { updateProductToLocalCart, removeProductfromLocalCart,} from "../redux/actions/cartLocalActions";
import { setOrderStep } from "../redux/actions/orderStepActions";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CartPage = () => {
  let history = useHistory();
  const productsInCart = useSelector((state) => state.cart.entries);
  const productsInCartLocal = useSelector((state) => state.cartLocal.products);
  const cart = useSelector((state) => state.cart);
  const cartLocal = useSelector((state) => state.cartLocal);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleProductQuantity = (productName, quantity) => {
    if (token) {
      dispatch(updateProductToCart(productName, quantity));
    } else {
      dispatch(updateProductToLocalCart(productName, quantity));
    }
  };

  const handleClickRemoveProductFromCart = (productName) => {
    if (token) {
      dispatch(removeProductFromCart(productName));
    } else {
      dispatch(removeProductfromLocalCart(productName));
    }
  };

  const handlekOrderStep = () => {
    dispatch(setOrderStep(0));
    history.push(`/orderSelectPage`);
  };

  if (token) {
    return (
      <Paper sx={{ p: 5, margin: "auto", maxWidth: 1000, flexGrow: 1 }}>
        {productsInCart.length !== 0 && (
          <Typography
            display="flex"
            justifyContent="center"
            gutterBottom
            variant="h5"
          >
            Cart
          </Typography>
        )}

        {productsInCart.length !== 0 && (
          <Typography
            display="flex"
            justifyContent="flex-end"
            gutterBottom
            variant="h6"
            component="div"
          >
            Total : {cart.total}
          </Typography>
        )}
        {productsInCart.length === 0 && (
          <Typography
            display="flex"
            justifyContent="center"
            gutterBottom
            variant="h6"
            component="div"
          >
            Cart is Empty!
          </Typography>
        )}
        {productsInCart.length !== 0 &&
          productsInCart.map((product) => (
            <Paper sx={{ p: 2, margin: "auto", maxWidth: 1000, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src={product.photoLinks.map(photo => photo.image)[0]} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {product.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Product Price: {product.price}
                      </Typography>
                    </Grid>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      variant="standard"
                    >
                      <Typography sx={{ cursor: "pointer" }} variant="body2">
                        Products :
                        <Select
                          sx={{
                            height: 30,
                            width: 57,
                          }}
                          value={product.quantity - 1}
                          MenuProps={{ PaperProps: { sx: { maxHeight: 220 } } }}
                        >
                          {[...Array(product.stock !== 0 && product.stock)].map(
                            (e, i) => {
                              return (
                                <MenuItem
                                  value={i}
                                  key={i}
                                  onClick={() =>
                                    handleProductQuantity(
                                      product.productName,
                                      i + 1
                                    )
                                  }
                                >
                                  {i + 1}
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                      </Typography>
                      <Grid>
                        <Button
                          onClick={() =>
                            handleClickRemoveProductFromCart(
                              product.productName
                            )
                          }
                          style={{
                            maxWidth: "300px",
                            maxHeight: "30px",
                            minWidth: "30px",
                            minHeight: "30px",
                            fontSize: "11px",
                          }}
                          startIcon={<ClearIcon />}
                        >
                          {" "}
                          {"Remove"}
                        </Button>
                      </Grid>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      Product total price : {product.price * product.quantity}
                    </Typography>
                  </Grid>
                  <Grid></Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
        <p></p>
        {productsInCart.length !== 0 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handlekOrderStep}
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              variant="contained"
              style={{ backgroundColor: "#3f51b5", color: "#FFFFFF" }}
            >
              order
            </Button>
          </Box>
        )}
      </Paper>
    );
  } else
    return (
      <Paper sx={{ p: 5, margin: "auto", maxWidth: 1000, flexGrow: 1 }}>
        {productsInCartLocal.length !== 0 && (
          <Typography
            display="flex"
            justifyContent="center"
            gutterBottom
            variant="h5"
          >
            Cart
          </Typography>
        )}

        {productsInCartLocal.length !== 0 && (
          <Typography
            display="flex"
            justifyContent="flex-end"
            gutterBottom
            variant="h6"
            component="div"
          >
            Total : {cartLocal.total}
          </Typography>
        )}
        {productsInCartLocal.length === 0 && (
          <Typography
            display="flex"
            justifyContent="center"
            gutterBottom
            variant="h6"
            component="div"
          >
            Cart is Empty!
          </Typography>
        )}
        {productsInCartLocal.length !== 0 &&
          productsInCartLocal.map((product) => (
            <Paper sx={{ p: 2, margin: "auto", maxWidth: 1000, flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src={product.photoLinks.map(photo => photo.image)[0]} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {product.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Product Price: {product.price}
                      </Typography>
                    </Grid>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      variant="standard"
                    >
                      <Typography sx={{ cursor: "pointer" }} variant="body2">
                        Products :
                        <Select
                          sx={{
                            height: 30,
                            width: 57,
                          }}
                          value={product.quantity - 1}
                          MenuProps={{ PaperProps: { sx: { maxHeight: 220 } } }}
                        >
                          {[...Array(product.stock !== 0 && product.stock)].map(
                            (e, i) => {
                              return (
                                <MenuItem
                                  value={i}
                                  key={i}
                                  onClick={() =>
                                    handleProductQuantity(product, i + 1)
                                  }
                                >
                                  {i + 1}
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                      </Typography>
                      <Grid>
                        <Button
                          onClick={() =>
                            handleClickRemoveProductFromCart(product)
                          }
                          style={{
                            maxWidth: "300px",
                            maxHeight: "30px",
                            minWidth: "30px",
                            minHeight: "30px",
                            fontSize: "11px",
                          }}
                          startIcon={<ClearIcon />}
                        >
                          {" "}
                          {"Remove"}
                        </Button>
                      </Grid>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      Product price : {product.price * product.quantity}
                    </Typography>
                  </Grid>
                  <Grid></Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
        <p></p>
        {productsInCartLocal.length !== 0 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handlekOrderStep}
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              variant="contained"
              style={{ backgroundColor: "#3f51b5", color: "#FFFFFF" }}
            >
              order
            </Button>
          </Box>
        )}
      </Paper>
    );
};

export default CartPage;
