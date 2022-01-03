import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { getProductByProductName } from "../redux/actions/productsActions";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    marginLeft: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    width: 300,
    backgroundColor: 'rgb(216 219 239)'
  },
  input: {
    marginLeft: theme.spacing(3),
    flex: 2,
    backgroundColor: 'rgb(216 219 239)'
  },
  iconButton: {
    padding: 6,
    backgroundColor: 'rgb(216 219 239)'
  },
}));

export default function SearchProductBar() {
  const classes = useStyles();

  const dispatch = useDispatch();
  let history = useHistory();
  const [product, setProduct] = useState('');
  const products = useSelector((state) => state).products.products;


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductByProductName(product));
    
console.log("OASDA:,", products);
    if (products.length !== 0) {
      history.push('/');
    
    }else{
      history.push('/productNotFoundPage');
    }

    setProduct('');
  };

  return (
    <Paper component="form" className={classes.root} >
      <InputBase

        className={classes.input}
        placeholder="Search Product.."
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search"  onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}