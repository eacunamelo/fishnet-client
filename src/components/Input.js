import styled, { css } from 'styled-components'

const inputBox = css`
  display: ${props => props.width != undefined ? 'inline-block' : 'block'};
  width: ${props => props.width != undefined ? props.width : '100%' };
  height: 40px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.1rem;
  padding: 0 1rem;
`

const Input = styled.input`
  ${inputBox};
`

const Select = styled.select`
  ${inputBox};
`

export { Input, Select }

