import style from "../../config/style";
import styled from "styled-components";

const Aboutus = () => {
  return (
    <AboutUsWrapper>
      <div className="container">
        <h1>Who We Are ?</h1>
        <p>
          We are a team of dedicated and passionate individuals who are
          dedicated to providing the best quality products to our customers. We
          are a team of dedicated and passionate individuals who are dedicated
          to providing the best quality products to our customers.
          <br />
          Our Team is made up of smart and talented individuals who are
          passionate about their work. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Nobis assumenda, eius dicta quam alias fuga totam
          ipsa dolore error! Ipsam illum iure vero natus, ex unde deleniti vitae
          laboriosam maxime? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nostrum quis beatae quaerat qui aliquid aperiam maxime magni
          dolorem molestiae id amet veritatis, excepturi praesentium, earum
          culpa quam vitae repudiandae modi. Nulla illo officia ullam,
          perspiciatis numquam sit debitis sint optio ea, consequuntur id
          excepturi, ipsam unde inventore dolores. Fugiat impedit aliquam, ab
          architecto incidunt quia eaque eveniet cum eligendi atque.
        </p>

        <h2>WE ARE DIFFERENT THAN THE REST</h2>
        <p>
          We Are Rooted in sales. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quod iure beatae unde similique eum cupiditate animi
          inventore. Corrupti facilis odio pariatur ipsam obcaecati blanditiis,
          fuga quas enim nemo labore iusto.
        </p>
      </div>

      <div className="btns">
        <button>Contact Us</button>
        <button>About Us</button>
      </div>
    </AboutUsWrapper>
  );
};

const AboutUsWrapper = styled.div`
  .container {
    width: 70%;
    background-color: #1b1c1b;
    margin: auto;
    font-size: 1.2rem;
    letter-spacing: 3px;
    color: ${style.colors.complementry};
    padding: 30px;
    margin-top: 100px;
    border-radius: 20px;
  }

  .btns {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;

    button {
      background-color: white !important;
      margin-left: 5px;
      color: #1b1c1b !important;
      border-radius: 10px;

      &:hover {
        background-color: #1b1c1b !important;
        color: white !important;
      }
    }
  }

  h1 {
    font-family: ${style.fontfamily.heading};
    color: ${style.colors.complementry};
    font-size: 3rem;
    margin-bottom: 0px;
    span {
      color: #fff;
    }
  }

  h2 {
    margin-top: 40px;
  }
`;

export default Aboutus;
