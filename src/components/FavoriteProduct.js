import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@material-ui/core/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { setProduct } from "../redux/actions/productActions";
import { removeProductFromFavorites } from "../../src/redux/actions/favoriteProductActions";
import { removeProductfromFavoritesLocal } from "../../src/redux/actions/favoriteLocalProductActions";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const FavoriteProduct = (product) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { photoLink, name, price } = product;
  const token = localStorage.getItem("token");

  const handleProductPage = () => {
    dispatch(setProduct(product));
    history.push(`/productPage`);
  };

  const handleClickRemoveProductFromFavorites = () => {
    if (token) {
      dispatch(removeProductFromFavorites(product.name));
    } else {
      dispatch(removeProductfromFavoritesLocal(product));
    }
  };

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
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Product price: {price}
              </Typography>
              <Grid>
                <Button
                  onClick={() => handleClickRemoveProductFromFavorites()}
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
};

export default FavoriteProduct;
