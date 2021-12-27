import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { addProductToFavorites } from '../../src/redux/actions/favoriteProductActions';
import { removeProductFromFavorites } from '../../src/redux/actions/favoriteProductActions';
import Container from '@mui/material/Container';
import { addProductToCart } from '../../src/redux/actions/cartActions';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Wrapper = styled.div`
  padding: 55px;
  display: flex;

`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  box-shadow: 5px 2px 8px grey;
  border-radius: 10px;
  width: 100%;
  height: 74vh;
  object-fit: cover;

`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;

`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  padding-bottom: 20px;
`;



const ProductPage = () => {

  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state) => state.favoriteProduct.productList);
  const productsInCart = useSelector((state) => state.cart.productsInCartList);
  const product = useSelector((state) => state.product);
  const [clicked, setClicked] = useState(false)
  const [cartClicked, setCartClicked] = useState(false)


  useEffect(() => {
    if (favoriteProducts.some(p => (p.productName === product.productName))) {
      setClicked(true);
    }
    else {
      setClicked(false)
    }
  }, [favoriteProducts, product.productName]);

  useEffect(() => {
    if (productsInCart.some(p => (p.productDto.productName === product.productName))) {
      setCartClicked(true);
    }
    else {
      setCartClicked(false)
    }
  }, [productsInCart, product.productName]);

  const handleFavoriteClick = () => {
    if (clicked === false) {
      setClicked(true)
      dispatch(
        addProductToFavorites(product.productName)
      );
    } else {
      setClicked(false)
      dispatch(
        removeProductFromFavorites(product.productName)
      );
    }

  };

  const handleClickCart = () => {
    if (cartClicked === false) {
      setCartClicked(true)
      dispatch(
        addProductToCart(product.productName, 1)
      );
    }
  }
  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.productPhotoLink} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.productName}</Title>
          <Desc>{product.productDescription}</Desc>
          <Grid container spacing={1}>
            <Price>$ {product.productPrice}</Price>
          </Grid>
          <Grid container direction={'column'} spacing={24}>
            {clicked !== true && (
              <Grid item md={6} >
                <Button onClick={() => handleFavoriteClick()} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#eeeeee" }} startIcon={<FavoriteBorderIcon />}> {'Add to Favorites'}</Button>
              </Grid>
            )}
            {clicked === true && (
              <Grid item  md={6} >
                <Button onClick={() => handleFavoriteClick()} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#eeeeee" }} startIcon={<FavoriteIcon sx={{ color: red[500] }} />}> {'Added to Favorites'}</Button>
              </Grid>
            )}
            {cartClicked !== true && (
              <Grid  item md={6} >
                <Button onClick={() => handleClickCart()} variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#eeeeee" }} startIcon={<AddShoppingCartIcon />}> {'Add to Cart'}</Button>
              </Grid>
            )}
            {cartClicked === true && (
              <Grid item md={6} >
                <Button variant="primary" style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '11px', backgroundColor: "#3f51b5", color: '#FFFFFF' }} startIcon={<ShoppingCartIcon />}> {'Prod. in Cart'}</Button>
              </Grid>
            )}
          </Grid>
        </InfoContainer>

      </Wrapper>
    </Container>
  );
};

export default ProductPage;