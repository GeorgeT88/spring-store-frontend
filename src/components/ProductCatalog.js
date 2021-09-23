import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import BasicPagination from './BasicPagination';
import Product from './Product';
import { useDispatch,useSelector } from 'react-redux';
import { getAllProducts }from "../redux/actions/productActions";






function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to='/' color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const ITEMS_PER_PAGE = 6;

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
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function ProductCatalog() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [productsOnPage, setProductsOnPage] = useState([]);

  const products = useSelector((state)=>state).products;

  useEffect(() => {  
    dispatch (getAllProducts());
  }, [dispatch]);

  useEffect(() => {  
    setCurrentPage(1);
    }, [products]);

  useEffect(() => {
    if (products.length) {
      setPageCount(Math.ceil(products.length / ITEMS_PER_PAGE));

      const endSlice = (ITEMS_PER_PAGE * currentPage) > products.length ? null : ITEMS_PER_PAGE * currentPage;
      let currentProducts = [];
      if (endSlice) {
        currentProducts = products.slice(ITEMS_PER_PAGE * (currentPage - 1), endSlice);
      }
      else {
        currentProducts = products.slice(ITEMS_PER_PAGE * (currentPage - 1));
      }
      setProductsOnPage(currentProducts);
    }

  }, [products, currentPage]);


  const onPageChange = (event, page) => {
    setCurrentPage(page);
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {productsOnPage.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </Grid>
        </Container>
        <BasicPagination
          onPageChange={onPageChange}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default ProductCatalog
