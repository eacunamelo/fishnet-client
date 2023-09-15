import styled from 'styled-components'
import { Input, Select } from './Input'
import Label from './Label'

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  padding: 30px 50px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 10px;
  margin: 0 auto;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 30px 30px;
  }

  & ${Input}, ${Select} {
    margin: .5rem 0 1.5rem 0;
  }

  & ${Label} {

  }
`

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 5px;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.25rem;
  cursor: pointer;
`

export { Form, Button }