import styled from 'styled-components'

import Label from '../Label'
import { Input, Select } from '../Input'
import { BiFirstPage, BiLastPage, BiChevronRight, BiChevronLeft } from 'react-icons/bi'

// Iconos de los botones de control de paginación
const Icon = styled.span.attrs(({ icon }) => ({
  children: icon
}))`
  font-size: 2rem;
  color: ${props => (!props.disabled)
          ? props.theme.colors.primary 
          : props.theme.colors.grayer};
  cursor: pointer;
`
// Botones de control de paginación
const Button = styled.button.attrs(({ icon, disabled }) => ({
  children: <Icon icon={icon} disabled={disabled} />
}))`
  display: inline-block;
  background-color: ${props => (!props.disabled)
                                ? props.theme.colors.white
                                : props.theme.colors.white};
  border: 1.5px solid ${props => (!props.disabled)
                                ? props.theme.colors.primary 
                                : props.theme.colors.gray};
  border-radius: 5px;
  margin-right: 5px;
`

const PagControls = ({ actions }) => {
  return (
    <div>
      <Button 
        onClick={actions.goToStart} 
        disabled={!actions.canPreviousPage}
        icon={<BiFirstPage />} 
      />
      <Button 
        onClick={actions.goToPrevious} 
        disabled={!actions.canPreviousPage} 
        icon={<BiChevronLeft />} 
      />
      <Button 
        onClick={actions.goToNext} 
        disabled={!actions.canNextPage} 
        icon={<BiChevronRight />} 
      />
      <Button 
        onClick={actions.goToEnd} 
        disabled={!actions.canNextPage} 
        icon={<BiLastPage />}
      />
    </div>
  )
}

const PagInfo = ({ pageIndex, pageCount }) => {
  return (
    <Label>{pageIndex + 1} de {pageCount}</Label>
  )
}

const PagGo = ({ pageIndex, onChange }) => {
  return (
    <div>
      <Label type={'inline'}>Ir a:</Label>
      <Input
        type='number'
        width='100px'
        defaultValue={pageIndex + 1}
        onChange={onChange}
      />
    </div>
  )
}

const PagShow = ({ value, onChange }) => {
  return (
    <div>
      <Label type='inline'>Mostrar:</Label>
      <Select width='' value={value} onChange={onChange}>
        {[10, 20, 30, 40, 50].map((value) => (
          <option key={value} value={value}>
            {value} registros
          </option>
        ))}
      </Select>
    </div> 
  )
}

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & > div > * {
    margin-right: 20px;
  }

  & > div > *:last-child {
    margin-right: 0px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: flex-end;
    
    & div:nth-child(2) {
      display: none;
    }
  }
`

export { Pagination, PagControls, PagInfo, PagGo, PagShow }