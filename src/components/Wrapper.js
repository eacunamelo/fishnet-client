import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 50px 0;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: 20px 0;
  }
`

export default Wrapper