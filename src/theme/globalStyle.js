import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.fonts.primary};
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
  }
  
  body {
    background-color: ${props => props.theme.colors.background};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.black};
  }

  span > svg {
    display: block;
  }
`

export default GlobalStyle