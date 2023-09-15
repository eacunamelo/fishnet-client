import styled from 'styled-components'

const GridCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1rem;
  margin-bottom: 50px;
`

export default GridCard