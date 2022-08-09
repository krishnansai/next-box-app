import { Card } from "react-bootstrap";
import styled from "styled-components";
import style from "../../config/style";

const gotoSingleProduct = (id: any) => {
  window.location.href = `/product/${id}`;
};

const SingleProduct = (products: any) => {
  let { product } = products;

  return (
    <Wrapper onClick={() => gotoSingleProduct(product._id)}>
      <div className="imagecover">
        <Card.Img variant="top" src={product.image[0]} />
      </div>
      <Card.Body className="p-5">
        <Card.Title className="text-capitalize col">
          {product.productName}
        </Card.Title>
        <button className="btnsmall">Show More...</button>
      </Card.Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 18rem;
  height: 26rem;
  transition: all ease-in-out 0.3s;
  padding: 10px;
  background-color: ${style.colors.dominant};
  border-radius: 10px;

  &:hover {
    box-shadow: ${style.colors.shadow};
    transform: translateY(-5px);
    transition: all ease-in-out 0.3s;
  }

  .col {
    color: ${style.colors.complementry};
    font-weight: 700 !important;
  }

  button {
    background-color: #1b1c1b !important;
  }

  .imagecover {
    padding: 30px;
    width: 300px;
    background-color: #1b1c1b;
    border-radius: 20px;

    &:hover {
      box-shadow: ${style.colors.shadow};
      transform: translateY(-5px);
      transition: all ease-in-out 0.3s;
      cursor: pointer;
    }
  }
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export default SingleProduct;
