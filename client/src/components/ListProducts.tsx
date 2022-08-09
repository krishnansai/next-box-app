import { Container, CardGroup, Stack } from "react-bootstrap";
import SingleProduct from "../Pages/common/SingleProduct";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import style from "../config/style";
import LoadingPage from "../Pages/common/LoadingPage";

const ListProducts = () => {
  const { error, loading, response } = useFetch(`/product/`, {});

  return (
    <Wrapper>
      <h2 className="text-center">
        Our <span>Products</span>
      </h2>
      <CardGroup
        id="products"
        className="cover-container d-flex h-100 p-3 mx-auto flex-column flex-wrap"
      >
        {loading ? <LoadingPage /> : error ? <div>{error}</div> : <></>}
        <Stack
          direction="horizontal"
          className="flex-wrap justify-center align-center"
          gap={4}
        >
          {response &&
            response.map((product: any) => (
              <SingleProduct product={product} key={product._id} />
            ))}
        </Stack>
      </CardGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 70%;
  margin: auto;
  margin-bottom: 200px;

  h2 {
    font-family: ${style.fontfamily.heading};
    font-size: 3rem;
    margin-bottom: 0px;
    span {
      color: #fff;
    }
  }
`;

export default ListProducts;
