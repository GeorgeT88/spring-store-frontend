import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Product from './Product';
import BasicPagination from './BasicPagination';
import { Link } from 'react-router-dom';
import axios from "axios";

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

  const [Data, setData] = useState({
    id: '',
    productName: ''
  })




  useEffect(()=>{
    axios.get('http://localhost:8081/getAllProducts')
      .then(res => {
        console.log('Response from main API: ', res)
     
    

        for (let i = 0; i < res.data.length; i++) {

        console.log('Test ID: ', res.data[i].id)
        setData({ id: res.data[i].id, productName: res.data[i].productName})

 

        }
      })
      .catch(err => {
        console.log(err);
      })
    },[])


  const classes = useStyles();
  console.log('Data:  ',Data)

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          <>
            <h1>{Data.id}</h1>
            <h1>{"Data.2"}</h1>
            <p>{Data.productName}</p>
            <Product data={Data}/>
        </>

           
          

          </Grid>

        </Container>
        <BasicPagination />
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
export default ProductCatalog;