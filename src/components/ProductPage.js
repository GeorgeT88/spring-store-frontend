import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { addProductToFavorites } from '../../src/redux/actions/favoriteProductActions';
import { removeProductToFavorites } from '../../src/redux/actions/favoriteProductActions';
import Container from '@mui/material/Container';

const Wrapper = styled.div`
  padding: 45px;
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

  const favoriteProducts = useSelector((state) => state.auth.favoriteProductList);
  const product = useSelector((state) => state.product);
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if(favoriteProducts.some(p =>(p.productName === product.productName))){
       setClicked(true);
      }
      else{
        setClicked(false) 
      }
    }, [favoriteProducts,product.productName]);

  const handleClick = () => {
    if (clicked === false) {
      console.log(product.productName)
      setClicked(true)
      dispatch(
        addProductToFavorites(product.productName)
      );
    } else {
      setClicked(false)
      dispatch(
        removeProductToFavorites(product.productName)
      );
    }

  };
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
          <Grid container spacing={1}>
            <Grid item xs="auto">
              <div>
                <Button variant="outlined" onClick={handleClick} startIcon={clicked ?  <FavoriteIcon sx={{ color: red[500] }}/> : <FavoriteBorderIcon /> } >ADD TO FAVORITES
                </Button>
              </div>
            </Grid>
            <Grid item xs="auto">
              <div>
                <Button variant="outlined" onClick={handleClick}>ADD TO CART</Button>
              </div>
            </Grid>
          </Grid>
        </InfoContainer>

      </Wrapper>
    </Container>
  );
};

export default ProductPage;