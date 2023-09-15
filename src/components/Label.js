import styled from 'styled-components'

const Label = styled.p`
  display: ${props => props.type === 'inline' ? 'inline-block' : 'block'};
  margin-right: ${props => props.type === 'inline' ? '10px' : ''};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.2rem;
  white-space: nowrap;
`

export default Label