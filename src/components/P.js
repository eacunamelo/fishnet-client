import styled from 'styled-components'

const P = styled.p`
  display: block;
  width: 100%;
  font-size: 18px;
  margin-top: 30px;
  text-align: ${props => props.align};
`

export default P