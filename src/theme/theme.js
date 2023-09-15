import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#0281F8',
    background: '#fafafa',
    black: '#333',
    gray: '#E4E2E2',
    grayer: '#ACB4BD',
    white: '#fff',
    statusOn: '#42CA3F',
    statusOff: '#FF000F'
  },
  fonts: {
    primary: 'Roboto',
    secondary: 'Roboto Condensed',
    tertiary: 'Poppins', 
  },
  breakpoints: {
    xs: '320px',
    sm: '768px',
    lg: '1200px'
  },
  sizes: {
    headerIcon: '30px',
  }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;