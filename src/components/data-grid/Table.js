import styled from 'styled-components'

const TH = styled.th`
  border-top: 1px solid ${props => props.theme.colors.gray};
  border-bottom: 2px solid ${props => props.theme.colors.gray};
  font-weight: 600;
  font-size: 1.1rem;
  text-align: left;
  position: relative;
`

const TD = styled.td`
  border-bottom: 1px solid ${props => props.theme.colors.gray};
`

const TR = styled.tr`
  ${TH}, ${TD} {
    padding: 10px 20px 10px 0;
    white-space: nowrap;
  } 

  ${TH}:last-child, ${TD}:last-child {
    padding: 10px 0 10px 0;
  }
`

const DataTable = styled.table`
  width: 100%;
  /* table-layout: auto; */
  margin-bottom: 5px;
  background-color: ${props => props.theme.colors.white};

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: 20px 0;

    // Convierte el row de horizontal a vertical
    & thead, tbody, ${TR}, ${TH}, ${TD} {
      display: block;
    }

    // Oculta la cabecera de la tabla
    thead ${TR} {
      position: absolute;
      top: -9999px;
		  left: -9999px;
    }

    // Estilos del contenedor de cada registro
    ${TR} { 
      border: 1px solid #ccc; 
      padding: 10px;
      border-radius: 10px;  
      margin-bottom: 10px;     
    }
    ${TR}:last-child {
      margin-bottom: 0;
    }

    // Estilos de las celdas de cada registro
    ${TD} { 
      width: 100%;
      border: none;
      padding: 5px 0;
      padding-left: ${props => (props.columns
                                .map(item => item.Header)
                                .reduce((acc, item) => { return Math.max(acc, item.length)}, 0) * 12 + 'px')};; 
      position: relative;
      white-space: normal;
    }

    // Agrega los nombre de las columnas al contenido de las celdas
    ${TD}::before {
      display: inline-block;
      width: ${props => (props.columns
                        .map(item => item.Header)
                        .reduce((acc, item) => { return Math.max(acc, item.length)}, 0) * 12 + 'px')};
      font-weight: 600;
      /* white-space: nowrap; */
      height: 100%;
        // PERRO
        position: absolute;
        top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px;
    }

    ${
      props => props.columns
        .map(item => item.Header)
        .map((item, index) => `td:nth-of-type(${index + 1}):before { content: '${item}'; }`)
    }  
  }
`

const Table = styled.div.attrs(({ children, ...props }) => ({
  children: <DataTable {...props}>{children}</DataTable>
}))`
  width: 100%;
  overflow: auto;
`

export { Table, TH, TD, TR }