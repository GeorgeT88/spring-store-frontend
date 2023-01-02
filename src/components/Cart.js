import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@material-ui/core/Typography";
import { styled } from "@mui/material/styles";
import { setProduct } from "../redux/actions/productActions";
import { removeProductFromCart } from "../redux/actions/cartActions";
import { removeProductfromLocalCart } from "../redux/actions/cartLocalActions";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Cart = (product) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  let history = useHistory();
  const { productName, photoLink, quantity, price } = product;

  const handleProductPage = () => {
    if (token) {
      dispatch(setProduct(product));
      history.push(`/productPage`);
    } else {
      dispatch(setProduct(product));
      history.push(`/productPage`);
    }
  };

  const handleClickRemoveProductFromCart = () => {
    if (token) {
      dispatch(removeProductFromCart(productName));
    } else {
      dispatch(removeProductfromLocalCart(product));
    }
  };

  if (token) {
    return (
      <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
        <Grid container spacing={2} style={{ border: "1px solid grey" }}>
          <Grid item>
            <ButtonBase
              sx={{ width: 128, height: 128 }}
              onClick={() => handleProductPage()}
            >
              <Img alt="complex" src={photoLink} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: 600 }}
                >
                  Product
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {productName} quantity: {quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Product price: {price}
                </Typography>
                <Grid>
                  <Button
                    onClick={() => handleClickRemoveProductFromCart()}
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    return (
      <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
        <Grid container spacing={2} style={{ border: "1px solid grey" }}>
          <Grid item>
            <ButtonBase
              sx={{ width: 128, height: 128 }}
              onClick={() => handleProductPage()}
            >
              <Img alt="complex" src={product.photoLink} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontWeight: 600 }}
                >
                  Product
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.name} quantity: {product.quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Product price: {product.price}
                </Typography>
                <Grid>
                  <Button
                    onClick={() => handleClickRemoveProductFromCart()}
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
};

export default Cart;
