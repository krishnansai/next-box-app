import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Modal, Toast } from "react-bootstrap";
import { orderproduct, addtocart } from "../../functions/productfunctions";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import style from "../../config/style";
import LoadingPage from "./LoadingPage";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const SingleProductDetail = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const adminLoggedIn: boolean =
    sessionStorage.getItem("role") === "admin" ? true : false;

  const id = useParams().id;

  const { error, loading, response } = useFetch(`/product/getsingle/${id}`, {});
  const [quantity, setQuantity] = useState(0);

  if (error) return <h3>"Something Went Wrong"</h3>;

  if (loading) return <LoadingPage />;

  const AddToCart = async (product: any) => {
    let id = product._id;

    let data = {
      productId: id,
    };

    return await addtocart(data);
  };

  const OrderProduct = (id: string) => {
    orderproduct(id);
  };

  const {
    productName,
    price,
    category,
    description,
    image: images,
    gsm,
    size,
    how,
    paper,
  } = response;

  const style = {
    textAlign: "center",
    background: "teal",
    padding: "200px 0",
    fontSize: "30px",
  };

  const properties = {
    duration: 3000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
    indicators: true,
  };

  const notify = (m: string) => toast(m);

  return (
    <>
      <Overallcontainer className="">
        <div className="image-cursol">
          <Carousel
            {...properties}
            dynamicHeight={false}
            autoPlay={true}
            showArrows={false}
            showIndicators={false}
            infiniteLoop={true}
            emulateTouch={true}
          >
            {images &&
              images.map((image: any, i: number) => {
                return (
                  <div key={i}>
                    <img width="40px" src={image} alt="Product Pic" />
                  </div>
                );
              })}
          </Carousel>
        </div>
        <SinglePageWrapper>
          <h2 className="">{productName}</h2>
          <h5 className=" text-capitalize">{price} ₹</h5>
          <div className="stars">
            <FaStar color="yellow" />
            <FaStar color="yellow" />
            <FaStar color="yellow" />
            <FaStar color="yellow" />
            <FaStarHalfAlt color="yellow" />
          </div>{" "}
          <h5 className=" text-capitalize">
            <span>Category :</span> {category}
          </h5>
          <h5 className=" text-capitalize">
            <span>GSM :</span> {gsm}
          </h5>
          <h5 className="text-capitalize ">
            <span>Size of the Box :</span> {size}
          </h5>
          <h5 className=" text-capitalize">
            <span>Paper Used:</span> {paper}
          </h5>
          <h5 className=" text-capitalize">
            <span>How it Made :</span> {how}
          </h5>
          <div className="form-group">
            <label htmlFor="quantity">How Many You Want?</label> <br />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              onChange={(e) => {
                setQuantity(parseInt(e.target.value));
              }}
            />{" "}
            <br />
          </div>
          {!adminLoggedIn && (
            <button
              className="btn-big"
              style={{
                marginLeft: "10px",
              }}
              onClick={() => {
                OrderProduct(response);
              }}
            >
              Buy Now
            </button>
          )}
        </SinglePageWrapper>
      </Overallcontainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable={true}
        theme="dark"
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="">Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button>Understood</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const SinglePageWrapper = styled.div`
  width: 70vw;
  background-color: ${style.colors.dominant};
  /* height: 50%; */
  color: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: ${style.colors.shadow};

  h2 {
    color: white;
  }

  input {
    padding: 10px;
    border-radius: 10px;
    font-size: 15px;
    color: black;
    border: none;
    margin-bottom: 20px;
  }

  h1 {
    font-family: ${style.fontfamily.heading};

    &:first-child {
      text-align: center;
      color: white;
    }
  }

  h4 {
    color: white;
    span {
      color: #b5f4ba;
    }
  }

  p {
    line-height: 1.6px;
    text-align: justify;
    font-size: ${style.fontsize.paragraph};
    color: ${style.colors.readingtext};
  }

  button {
    background-color: white;
    color: black;
    border-radius: 10px;

    &:hover {
      background-color: ${style.colors.accent};
      color: white;
      border: 1px solid white;
      transform: translateY(-2px);
    }
  }
`;

const Overallcontainer = styled.div`
  height: 60%;
  padding-top: 6%;
  width: 90vw;
  margin: auto;
  display: flex;

  .image-cursol {
    width: 650px !important;
    max-height: 650px !important;
    border-radius: 20px;
    background-color: #1c1c1c !important;
    padding: 20px;
  }
`;

export default SingleProductDetail;
