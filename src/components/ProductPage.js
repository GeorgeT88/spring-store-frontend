import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';


const Container = styled.div``;

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
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const ProductPage = () => {

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const product = useSelector((state) => state.product);


  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      //     addProduct({ ...product, quantity, color, size })
    );
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
          <Price>$ {product.productPrice}</Price>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ProductPage;