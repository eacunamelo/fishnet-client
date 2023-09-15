import { useMemo } from 'react'
import { Link as link } from "react-router-dom";
import { useGlobalFilter, useFilters, usePagination, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'
import { PagControls, PagGo, Pagination, PagInfo, PagShow } from './Pagination'
import { GlobalFilter } from './Filtering'
import { Table, TD, TH, TR } from './Table'
import { SortDown, SortUp } from './Sorting'
import moment from 'moment-timezone'
import 'moment/locale/es'

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 50px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 10px;

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 20px 20px;
  } 
`

const Link = styled(link)`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
`

const DataGrid = ({ columns, data }) => {
  columns = useMemo(() => columns, [])
  data = useMemo(() => data, [])

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      preGlobalFilteredRows,
      setGlobalFilter,
      state: { pageIndex, pageSize, globalFilter }
  } = useTable({
      columns,
      data,
      initialState: { pageSize: 10 },
  }, useFilters, useGlobalFilter, useSortBy, usePagination )

  const goToPage = (e) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    gotoPage(page);
  }

  const showNRows = (e) => {
    setPageSize(Number(e.target.value))
  }
  
  const goToStart = () => {
    gotoPage(0)
  } 
  
  const goToPrevious = () => {
    previousPage()
  }
  
  const goToNext = () => {
    nextPage()
  }
  
  const goToEnd = () => {
    gotoPage(pageCount - 1)
  }
  
  const actions = {
    goToStart, goToPrevious, goToNext, goToEnd, canPreviousPage, canNextPage
  }

  const renderContent = (type, value, url) => {
    switch (type) {
      case 'relativeDate':
        return moment(value, moment.ISO_8601).fromNow()
        break;
      case 'detail':
        return  <Link to={`/${url}/${value}`}>
                  {value}
                </Link>
        break;
      default:
        return value
    }
  }

  return (
    <Wrapper>
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />  
      <Table {...getTableProps()} columns={columns} data={data} >
        <thead>
          {headerGroups.map(headerGroup => (
            <TR {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TH key={column.id} style={{width: column.width, textAlign: column.alignment}}>
                  <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {
                    column.isSorted 
                    ? column.isSortedDesc
                      ? <SortDown/>
                      : <SortUp/>
                    : null
                  }
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </TH>
              ))}
            </TR>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <TR {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <TD {...cell.getCellProps()} style={{textAlign: cell.column.align ? cell.column.align : "left"}}>
                      {renderContent(cell.column.type, cell.value, cell.column.url)}
                    </TD>
                  })}
              </TR>
            )
          })}
        </tbody>
      </Table>
      <Pagination>
        <div>
          <PagControls actions={actions} />
          <PagInfo pageIndex={pageIndex} pageCount={pageCount} />
        </div>
        <div>
          <PagGo pageIndex={pageIndex} onChange={goToPage} /> 
          <PagShow value={pageSize} onChange={showNRows} />
        </div>
      </Pagination>
    </Wrapper>
  )
}

export default DataGrid