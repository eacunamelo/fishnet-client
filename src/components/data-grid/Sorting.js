import styled, { css } from 'styled-components'
import { BsSortDown, BsSortUpAlt } from 'react-icons/bs'

const icon = css`
  position: absolute;
  top: .5rem;
  font-size: 1.3rem;
  margin-left: .5rem;
`

const SortUp = styled(BsSortUpAlt)`
  ${icon};
`

const SortDown = styled(BsSortDown)`
  ${icon};
`

export { SortUp, SortDown }