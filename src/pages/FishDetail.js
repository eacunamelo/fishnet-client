import { useParams } from 'react-router-dom'
import { Wrapper, Title, Group, Data } from '../components/Steps'
import Breadcrumbs from '../components/Breadcrumb'

const FishDetail = () => {
  const id = useParams().id

  const fish = {
    id: 1,
    specie: 'DOL',
    custodian: 'Edwin Aguilar',
    caught: {
      lot: 1,
      port: 'Matarani',
      fisher: 'Edwin Aguilar',
      vessel: 'Damaris II',
      gear: 'Pinta',
      datetime: '2021-12-13 05:30:00',
      latitude: '-16.996944',
      longitude: '-72.1075',
      transportation: {
        hold: 3,
        temperature_hold: '1 - 3.8',
        temperature_load: '0 - 1.5'
      }
    }
  }

  return (
    <>
      <Breadcrumbs />
      <Wrapper cols={4}>
        <Title>General</Title>
        <Group>
          <Data title='ID' value={fish.id}></Data>
          <Data title='Especie' value={fish.specie}></Data>
          <Data title='Custodio' value={fish.custodian}></Data>
        </Group>
        <Title>Captura</Title>
        <Group>
          <Data title='Lote' value={fish.caught.lot}></Data>
          <Data title='Puerto' value={fish.caught.port}></Data>
          <Data title='Pescador' value={fish.caught.fisher}></Data>
          <Data title='Embarcación' value={fish.caught.vessel}></Data>
          <Data title='Arte de Pesca' value={fish.caught.gear}></Data>
          <Data title='Fecha de captura' value={fish.caught.datetime}></Data>
          <Data title='Latitud' value={fish.caught.latitude}></Data>
          <Data title='Longitud' value={fish.caught.longitude}></Data>
        </Group>
        <Title>Transporte</Title>
        <Group>
          <Data title='Bodega' value={fish.caught.transportation.hold}></Data>
          <Data title='Temp. Bodega (˚C)' value={fish.caught.transportation.temperature_hold}></Data>
          <Data title='Temp. Carga (˚C)' value={fish.caught.transportation.temperature_load}></Data>
        </Group>
      </Wrapper>
    </>
  )
}

export default FishDetail