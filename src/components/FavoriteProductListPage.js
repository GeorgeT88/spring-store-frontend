import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import FavoriteProductPage from './FavoriteProductPage';




const FavoriteProductListPage = () => {

  const favoriteProducts = useSelector((state) => state.favoriteProduct.products);
  const favoriteLocalProducts = useSelector((state) => state.favoriteLocalProduct.products);
  const token = localStorage.getItem('token');






  if (token) {
    return (
      <Paper sx={{ p: 5, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>

        {favoriteProducts.length !== 0 && (
          <Typography display="flex" justifyContent="center" variant="h5" component="div" paragraph={true}>
            Favorite Product List
          </Typography>
        )}

        {favoriteProducts.length === 0 && (

          <Typography display="flex" justifyContent="center" gutterBottom variant="h6" component="div">
            Favorite Product List is empty!
          </Typography>
        )}

        {favoriteProducts.map((product) => (
          <FavoriteProductPage key={product.id} {...product} />
        ))
        }
      </Paper>
    );
  } else {
    return(
    <Paper sx={{ p: 5, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>

      {favoriteLocalProducts.length !== 0 && (
        <Typography display="flex" justifyContent="center" variant="h5" component="div" paragraph={true}>
          Favorite Product List
        </Typography>
      )}

      {favoriteLocalProducts.length === 0 && (

        <Typography display="flex" justifyContent="center" gutterBottom variant="h6" component="div">
          Favorite Product List is empty!
        </Typography>
      )}

      {favoriteLocalProducts.map((product) => (
        <FavoriteProductPage key={product.id} {...product} />
      ))
      }
    </Paper>
    );
  }
}

  export default FavoriteProductListPage;