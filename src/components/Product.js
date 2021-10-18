import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProductPage from './ProductPage'
import { useDispatch } from 'react-redux';
import { setProduct }from "../redux/actions/productActions";


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
const Product = (product) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const {productPhotoLink, productName, productDescription, productPrice } = product;


  const handleProductPage = () => {
    dispatch (setProduct(product));
    history.push(`/productPage`);

  }
 

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={productPhotoLink}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {productName}
          </Typography>
          <Typography>
            {`Description: ${productDescription}`}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {`Product price:  ${productPrice}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => handleProductPage()}>
          {`Details`}
          </Button>
          <Button size="small" color="primary">
            {`Add To Cart`}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Product;