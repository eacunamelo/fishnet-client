import 'moment/locale/es'
import { useEffect, useState } from 'react'
import DataGrid from '../components/data-grid/DataGrid'
import { ColumnDateFilter, ColumnNumberFilter, DefaultColumnFilter, filterDate, filterGreaterThan } from '../components/data-grid/Filtering'
import LotRepository from '../services/repository/LotRepository'

const LotView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    LotRepository.getAll()
    .then((res) => {
      const mapped = res.map((item) => {
        return {
          id: item.id,
          specie: item.fishing.specie,
          port: item.landing.port,
          user: item.createdBy,
          landed_time: item.landing.timestamp,
          volume: item.landing.volume,
        }
      })
      setData(mapped)
    })
  }, [])

  useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
  }, [data])

  const columns = [
    {
      accessor: 'id',
      Header: 'ID Lote',
      type: 'detail',
      Filter: DefaultColumnFilter,
      filter: 'equals',
      url: 'lotes'
    },
    {
      accessor: 'specie',
      Header: 'Especie',
      Filter: DefaultColumnFilter,
      filter: 'fuzzyText',
    },
    {
      accessor: 'port',
      Header: 'Puerto',
      Filter: DefaultColumnFilter,
      filter: 'fuzzyText',
    },
    {
      accessor: 'user',
      Header: 'Dueño',
      Filter: DefaultColumnFilter,
      filter: 'fuzzyText',
    },
    {
      accessor: 'landed_time',
      Header: 'Desembarque',
      type: 'relativeDate',
      Filter: ColumnDateFilter,
      filter: filterDate,
    },
    {
      accessor: 'volume',
      Header: 'Volumen',
      Filter: ColumnNumberFilter,
      filter: filterGreaterThan,
      align: 'right',
    },
  ]

  return (
    <>
      {
        isLoading 
        ? null
        : <DataGrid columns={columns} data={data} />
      }
    </>
  )
}

export default LotView