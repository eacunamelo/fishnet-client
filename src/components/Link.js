import styled from 'styled-components'
import { Link as link } from 'react-router-dom'

const Link = styled(link)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
`

export default Link