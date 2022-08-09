import ChatBot from "react-simple-chatbot";
import styled from "styled-components";
import style from "../config/style";
import React, { Component }  from 'react';
const ChatBotComponent = (props) => {
  return (
    <ChatBotWrapper className="chatBot">
      <ChatBot {...props} />
    </ChatBotWrapper>
  );
};

const ChatBotWrapper = styled.div`
  position: fixed;
  z-index: 888;
  right: 20px;
  bottom: 100px;
  font-family: "Eczar, serif" !important;
`;

export default ChatBotComponent;
