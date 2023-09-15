import styled from 'styled-components'
import { Title as title } from '../components/Title'

const Title = styled(title)`
  margin-bottom: 0; 
  position: relative;
  left: 40px;
  color: ${props => props.theme.colors.primary};

  &:not(:first-child):before {
    content: '';
    width: 10px;
    height: 10px;
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 20px;
    position: absolute;
    left: -36px;
    top: 3px;
  }
`

const Group = styled.div`
  display: grid;
  grid-gap: 1.5rem 1rem;
  margin-left: 10px;
  padding: 20px 0 50px 30px;
  border-left: 2px dashed ${props => props.theme.colors.primary};

  &:first-of-type {
    border-left: none;
  }

  &:last-of-type {
    padding: 30px 0 0 30px;
    border-left: none;
  }
`

const Label = styled.p`
  font-size: 1.1rem;
  margin-bottom: .5rem;
  font-weight: 600;
`

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 50px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 10px;

  ${Group} {
    grid-template-columns: ${props => `repeat(auto-fill, minmax(calc(1000px/${props.cols}), 1fr))`};
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 20px 20px;
  } 
`

const Data = styled.div.attrs(({title, value}) => ({
  children: <>
  <Label>{title}</Label>
  <p>{value}</p>
  </>
}))`
  white-space: nowrap;
`

export { Wrapper, Title, Group, Label, Data }