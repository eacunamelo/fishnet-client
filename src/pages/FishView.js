import DataGrid from '../components/data-grid/DataGrid'
import { ColumnNumberFilter, DefaultColumnFilter, filterLessThan, SelectColumnFilter } from '../components/data-grid/Filtering'

const FishView = () => {
  const data = [
    {
      id: '1',
      lot: '1',
      specie: 'DOL',
      owner: 'Edwin Aguilar',
      caught_time: 9,
      coldchain_status: 'Intacta'
    },
    {
      id: '2',
      lot: '1',
      specie: 'DOL',
      owner: 'Edwin Aguilar',
      caught_time: 15,
      coldchain_status: 'Rota'
    }
  ]

  const columns = [
    { 
      accessor: 'id',
      Header: 'ID Pescado',
      Filter: DefaultColumnFilter,
      filter: 'equals',
      type: 'detail',
      url: 'pescados'
    },
    { 
      accessor: 'lot',
      Header: 'ID Lote',
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
      accessor: 'owner',
      Header: 'Dueño',
      Filter: DefaultColumnFilter,
      filter: 'fuzzyText'
    },
    { 
      accessor: 'caught_time',
      Header: 'Tiempo (Días)',
      Filter: ColumnNumberFilter,
      filter: filterLessThan
    },
    { 
      accessor: 'coldchain_status',
      Header: 'Cadena de frío',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
  ]

  return (
    <>
      <DataGrid columns={columns} data={data} />
    </>
  )
}

export default FishView