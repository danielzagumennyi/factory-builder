import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body { 
    min-width: 320px;
    font-family: sans-serif;
    font-size: 14px;
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
