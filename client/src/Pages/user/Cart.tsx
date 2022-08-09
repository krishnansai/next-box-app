import { Container } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import "./user.style.scss";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import style from "../../config/style";
import { removeProductFromCart } from "../../functions/productfunctions";
import LoadingPage from "../common/LoadingPage";

const Cart = () => {
  const { error, loading, response } = useFetch(`/user/cart/`, {});
  const navigate = useNavigate();

  if (loading) return <LoadingPage />;
  if (error) return <h4>{error}</h4>;

  const navigateToSingleProduct = (id: string) => navigate("/product/" + id);

  let data = response.filter((e: any) => e != null);

  const removeParticularProduct = async (id: string) => {
    let _ = {
      productId: id,
    };
    data = data.filter((e: any) => e._id != id);
    await removeProductFromCart(_);
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <CartWrapper>
      {response && data.length > 0 ? (
        <h1>Your Cart</h1>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
      {response &&
        data.map((product: any, i: number) => {
          return (
            <Container key={i} id={"CartSingleProduct"}>
              <Container className="inner">
                <h3>{product?.productName}</h3>
                <h6>{product?.price} ₹</h6>
                <h6>Size : {product?.size}</h6>
                <h6>GSM Type : {product?.gsm}</h6>
                <h6>{product?.how}</h6>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigateToSingleProduct(product._id)}
                  >
                    Show More
                  </button>
                  <button
                    onClick={() => removeParticularProduct(product._id)}
                    className="btn btn-danger"
                  >
                    Remove Item
                  </button>
                </div>
              </Container>
              <img src={product.image[0]} alt="Product Pic" />
            </Container>
          );
        })}
    </CartWrapper>
  );
};

const CartWrapper = styled.div`
  #CartSingleProduct {
    background-color: #1c1c1c !important;
  }
  h1 {
    text-align: center;
    margin-top: 40px;
    font-family: ${style.fontfamily.heading};
    color: white;
  }

  button {
    &:first-child {
      margin-right: 10px;
    }
  }

  margin-bottom: 30px;
`;

export default Cart;
