import styled, { css } from 'styled-components'

const Card = styled.div`
  width: 100%;
  height: 150px;
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 10px;
  background-color: ${props => props.theme.colors.white};
  text-align: center;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  grid-column: span ${({ span }) => span};
` 

const icon = css`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
`

const IconWrapper = styled.span`
  ${icon}
`

const StatusIndicator = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({status}) => status 
    ? props => props.theme.colors.statusOn
    : props => props.theme.colors.statusOff};
  position: absolute;
  right: 10px;
  top: 10px;
`

const Title = styled.p.attrs(({ text }) => ({
  children: text
}))`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.4rem;
`
const TitleSmall = styled.p.attrs(({ text }) => ({
  children: text
}))`
  font-size: 1.2rem;
`

const Value = styled.p.attrs(({ text }) => ({
  children: text
}))`
  font-size: 3rem;
  font-weight: 600;
`

const Unit = styled.p.attrs(({ text }) => ({
  children: text
}))`
  font-size: .8rem;
`

const CardNode = ({ icon, name, status }) => {
  return (
    <Card>
      <StatusIndicator status={status} />
      <IconWrapper>{icon}</IconWrapper>
      <TitleSmall text={name} />
    </Card>
  )
}

const CardSensor = ({ name, value, unit, status }) => {
  return (
    <Card>
      <StatusIndicator status={status} />
      <Title text={name} />
      <Value text={(status) ? value : '---'} />
      <Unit text={unit} />
    </Card>
  )
}

const CardValue = ({ name, value, span, status }) => {
  return (
    <Card span={span}>
      <Title text={name} />
      <Value text={(status) ? value : '---'} />
    </Card>
  )
}

export { CardNode, CardSensor, CardValue }