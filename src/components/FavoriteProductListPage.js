import React from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FavoriteProductPage from "./FavoriteProductPage";

const FavoriteProductListPage = () => {
  const favoriteProducts = useSelector(
    (state) => state.favoriteProduct.products
  );
  const favoriteLocalProducts = useSelector(
    (state) => state.favoriteLocalProduct.products
  );
  const token = localStorage.getItem("token");

  return (
    <Paper sx={{ p: 5, margin: "auto", maxWidth: 1000, flexGrow: 1 }}>
      <Typography
        display="flex"
        justifyContent="center"
        variant="h5"
        component="div"
        paragraph={true}
      >
        {token
          ? favoriteProducts.length > 0
            ? "Favorite Product List!"
            : "Favorite Product List is empty!"
          : favoriteLocalProducts.length > 0
          ? "Favorite Product List!"
          : "Favorite Product List is empty!"}
      </Typography>

      {token
        ? favoriteProducts.map((product, index) => (
            <FavoriteProductPage key={product.id} product={product} index={index} />
          ))
        : favoriteLocalProducts.map((product, index) => (
            <FavoriteProductPage key={product.id} product={product} index={index} />
          ))}
    </Paper>
  );
};

export default FavoriteProductListPage;
