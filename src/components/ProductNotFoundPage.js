
import React, { } from 'react';


import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';




const ProductNotFoundPage = () => {




  return (
    <Paper sx={{ p: 5, margin: 'auto', maxWidth: 1000, flexGrow: 1 }}>
      <Typography display="flex" justifyContent="center" gutterBottom variant="h5" >
        Product Not Found!
      </Typography>
    </Paper>
  );
}

export default ProductNotFoundPage;