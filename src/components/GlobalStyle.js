import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${({theme}) => theme.colors.grey.variant100}
  }
`

export default GlobalStyle;
