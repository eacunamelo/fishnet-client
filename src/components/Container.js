import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 1366px;
  width: 90%;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    padding: 0 20px;
	}
`

export default Container