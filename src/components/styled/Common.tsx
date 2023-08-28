import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    color: #fff;
    background-color: #181818;
  }

  #root {
    min-height: 100vh;
    display: flex;
    align-items: stretch;
  }
`;

export const ResetStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
