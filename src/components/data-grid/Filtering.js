import { useState, useMemo } from 'react'
import { useAsyncDebounce } from 'react-table'
import styled from 'styled-components'

import { Input as input, Select as select } from '../Input'
import label from '../Label'
import moment from 'moment-timezone'
import 'moment/locale/es'

const Label = styled(label)`
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
`

const InputGlobal = styled(input)`
  margin-bottom: 30px;
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
    width: 100%;
  }
`
// Filtros globales
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter)

  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <>
      <Label type='inline'>Buscar:</Label>
      <InputGlobal
        width='400px'
        type='text'
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </>
  )
}

const InputColumn = styled(input)`
  display: block;
  margin-top: 10px;
  padding: 0 10px;
`

const Select = styled(select)`
  display: block;
  margin-top: 10px;
  padding: 0 10px;
`

// Filtros por columna
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {

  return (
      <InputColumn
          value={filterValue || ''}
          onChange={e => {
              setFilter(e.target.value || undefined)
          }}
      />
  )
}


const ColumnNumberFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {

  return (
      <InputColumn
          type='number'
          value={filterValue || ''}
          onChange={e => {
              setFilter(e.target.value || undefined)
          }}
      />
  )
}

const ColumnDateFilter = ({
  column: { filterValue, preFilteredRows, setFilter, days },
}) => {
  return (
      <InputColumn
          type='number'
          value={filterValue || ''}
          onChange={e => {
            setFilter(e.target.value || undefined)
          }}
      />
  )
}

const filterDate = (rows, id, filterValue) => {
  return rows.filter(row => {
    var now = moment(new Date())
    var end = moment(row.values[id], moment.ISO_8601)
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    const rowValue = days
    return rowValue <= filterValue
  })
}

const filterGreaterThan = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

const filterLessThan = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue <= filterValue
  })
}

const NumberRangeColumnFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) => {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      De
      <InputColumn
      style={{width: '100%'}}
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      a
      <InputColumn
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
      />
    </div>
  )
}

const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <Select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">Cualquiera</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}

export { ColumnDateFilter, filterDate, GlobalFilter, DefaultColumnFilter, SelectColumnFilter, NumberRangeColumnFilter, ColumnNumberFilter, filterGreaterThan, filterLessThan }