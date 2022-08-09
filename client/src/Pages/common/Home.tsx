import { Link } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";
import ListProducts from "../../components/ListProducts";
import styled from "styled-components";
import style from "../../config/style";
import Footer from "./Footer";

const Home = () => {
  const scroll = () => {
    window.scrollTo(0, 700);
  };

  let userLoggedIn =
    sessionStorage.getItem("NQi6OMGG0sa_7UW_noxIn1ZS0-XVk&d") == "ok"
      ? true
      : false;

  return (
    <>
      <Container id="home">
        <div id="firstsection">
          <div className="info">
            <div>
              <h1>
                <span>
                  {" "}
                  <br /> Sakthi Velavan <br /> Packages
                </span>
              </h1>
              <div className="sub">Feel a quality service with us...</div>
              <Link to={"#products"} onClick={scroll}>
                <button className="btn-big">Take a Look</button>
              </Link>
              {userLoggedIn ? (
                <></>
              ) : (
                <Link to={"/login"}>
                  <button className="btn-big">Login</button>
                </Link>
              )}
            </div>
            <img src="/homeimage.png" alt="Boxes" width={"40%"} />
          </div>
        </div>

        <ListProducts />
      </Container>
      <DetailsSection>
        <div className="cont">
          <div className="img-cio">
            <img src="/5671120.jpg" alt="Man Lift Box" width={"600px"} />
          </div>
          <div className="info">
            <h2>Feel The Real Quality</h2>
            We Made 100% Good And Quality Products for our Customers. We
            Prioritize Customer Satisfaction! So Our Customers are Happy to Shop
            Us
          </div>
        </div>
        <div className="cont">
          <div className="info">
            <h2>Your Satisfaction is Our Priority</h2>
            We Made 100% Good And Quality Products for our Customers. We
            Prioritize Customer Satisfaction! So Our Customers are Happy to Shop
            Us
          </div>
          <div className="img-cio">
            <img src="/Lifiting.jpg" alt="Man Lift Box" width={"650px"} />
          </div>
        </div>
      </DetailsSection>
      <Footer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column !important;
  font-family: ${style.fontfamily.common};

  button {
    // make shadow look like a button
    box-shadow: 3px 6px 1px black;

    &:active {
      box-shadow: 0px 0px 1px black;
    }
  }

  #firstsection {
    height: 110vh;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    /* text-align: center; */
    padding-bottom: 10%;
    font-family: ${style.fontfamily.heading};

    button {
      background-color: #1b1c1b !important;
      margin-left: 5px;
    }

    .sub {
      font-size: 1.5rem;
      color: #fff;
      margin-left: 10px;
      margin-bottom: 20px;
    }

    .info {
      display: flex !important;
    }

    h1 {
      font-family: ${style.fontfamily.heading};
      font-size: 2rem;
      margin-bottom: 0px;
      color: ${style.colors.complementry};

      span {
        color: ${style.colors.complementry};
        font-size: 4rem;
        text-transform: uppercase;
      }
    }

    h3 {
      font-family: ${style.fontfamily.heading};
      padding: 5;
      color: ${style.colors.complementry};
      margin-top: 2px;
      letter-spacing: 3px;
    }
  }
`;

const DetailsSection = styled.div`
  height: 100vh;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 80px;
  bottom: 0;

  .cont {
    display: flex;
    gap: 20px;

    img {
      border-radius: 20px;
      
    }

    .info {
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
    }

    h2 {
      font-family: ${style.fontfamily.heading};
      color: white;
    }
  }
`;

export default Home;
