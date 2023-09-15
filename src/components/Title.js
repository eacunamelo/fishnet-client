import styled from 'styled-components'

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.tertiary};
  font-size: 1.3rem;
  display: block;
  margin-bottom: ${props => (props.gap) ? props.gap : '1rem'};

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.4rem;
  }
`

const Subtitle = styled.p`
  display: ${props => props.type === 'inline' ? 'inline-block' : 'block'};
  margin-right: ${props => props.type === 'inline' ? '10px' : ''};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.2rem;
  white-space: nowrap;
`

export { Title, Subtitle }