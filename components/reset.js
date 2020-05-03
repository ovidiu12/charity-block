import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .ReactModal__Overlay{
    background: rgba(0,0,0,0.5) !important;
  }
  .ReactModal__Content{
    padding: 50px !important;
  }
`;

export default GlobalStyle;
