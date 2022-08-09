import styled from "styled-components";
import { CirclesWithBar } from "react-loader-spinner";
import { useEffect } from "react";

const LoadingPage = () => {
  useEffect(() => {
    window.onscroll = () => {
      window.scroll(0, 0);
    };

    return () => {
      window.onscroll = () => {};
    };
  }, []);

  return (
    <>
      <LoadingWrapper>
        <CirclesWithBar
          height="100px"
          width="100px"
          color="white"
          // ariaLabel="loading"
        />
      </LoadingWrapper>
      <LoadingWrapper>
        <div style={{ opacity: 0 }}>Loading</div>
      </LoadingWrapper>
    </>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  background-color: #1f1d1d92;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: #fff;
  font-size: 2rem;
  padding-top: 10%;
  padding-bottom: 10%;
  text-align: center;
`;

export default LoadingPage;
