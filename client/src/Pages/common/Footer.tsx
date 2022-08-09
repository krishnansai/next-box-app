import React from "react";
import styled from "styled-components";
import style from "../../config/style";
import { Link } from "react-router-dom";

const Footer: React.FC<any> = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <div className="section">
          <h1>SVP</h1>
          <h3>
            We Server Good Quality of Products. <b>be BOLD</b>
          </h3>
        </div>
        <div className="section">
          <ul>
            <li>
              <b>Explore</b>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="section">
          <ul>
            <li>Address</li>

            <br />
            <li>
              <b>Business</b>
            </li>
            <li>
              <Link to="mailto:svp@gmail.com">
                <b>
                  <i className="fas fa-envelope">svp@gmail.com</i>
                </b>
              </Link>
            </li>
            <li>
              <Link to="tel:+91949494949">+91 949494949</Link>
            </li>
          </ul>
        </div>
        <div className="section">
          <ul>
            <li>
              <b>Follow</b>
            </li>
            <li>
              <a href="https://www.facebook.com/">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com/">Instagram</a>
            </li>
            <li>
              <a href="https://www.twitter.com/">Twitter</a>
            </li>
          </ul>
        </div>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100vw;
  background-color: #1b1c1b !important;
  height: 300px;
  margin: 160px 40px 0px 0px;
  bottom: 0;

  .container {
    display: flex;
    background-color: #1b1c1b !important;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0px;
    font-family: ${style.fontfamily.common};
  }

  .section {
    &:first-child {
      text-align: start;
      display: flex;
      align-items: flex-start;
      margin-left: 40px;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0px;
    font-family: ${style.fontfamily.common};
  }

  ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    font-family: ${style.fontfamily.common};
  }

  li {
    /* font-size: 10px; */
    color: #fff;
    margin-left: 10px;
    margin-bottom: 20px;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  h3 {
    font-family: ${style.fontfamily.heading};
    padding: 0;
    color: #fff;
    font-size: 1rem;
  }

  h1 {
    font-family: ${style.fontfamily.heading};
    /* font-size: 2rem; */
    margin-bottom: 0px;
    color: ${style.colors.complementry};

    span {
      color: ${style.colors.complementry};
      /* font-size: 7rem;  */
      text-transform: uppercase;
    }
  }
`;

export default Footer;
