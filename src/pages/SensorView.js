import { AiOutlineCompass } from 'react-icons/ai'
import { BsThermometerSnow } from 'react-icons/bs'
import { CardNode, CardSensor, CardValue } from '../components/Card'
import GridCard from '../components/GridCard'
import { Title } from '../components/Title'
import useSocket from '../hooks/useSocket'

const isDisconnected = (...values) => {
  return values.filter(x => x != -99).length == 0 ? false : true
}

let sensors = {
  temperature: {
    status: false,
    nodes: [
      { id: 1, status: false, value: 0 },
      { id: 2, status: false, value: 0 },
      { id: 3, status: false, value: 0 }
    ]
  },
  geolocation: {
    status: false,
    n_satellites: 0,
    latitude: 0.0,
    longitude: 0.0
  }
}

const SensorView = () => {
  const [ws, message, setMessage] = useSocket(sensors)

  switch(message.type) {
    case "TEMPERATURE":
      sensors = {
        ...sensors,
            temperature: {
                status: true,
                nodes: [
                    { id: 1, status: isDisconnected(message.hold1, message.load1), value: message.load1 },
                    { id: 2, status: isDisconnected(message.hold2, message.load2), value: message.load2 },
                    { id: 3, status: isDisconnected(message.hold3, message.load3), value: message.load3 },
                ]
            }}
        break
    case "GEOLOCATION": 
        sensors = {
            ...sensors,
            geolocation: {
                status: isDisconnected(message.satellites, message.latitude, message.longitude),
                n_satellites: message.satellites,
                latitude: message.latitude,
                longitude: message.longitude
            }
        }
        break
    default:
      sensors = message
      break
  }

  return (
    <>
      <Title>Temperatura</Title>
      <GridCard>
        <CardNode icon={<BsThermometerSnow/>} name='Temperatura Bodega' status={sensors.temperature.status} />
        {
          sensors.temperature.nodes.map(item => {
            return <CardSensor key={item.id} name={`Bodega ${item.id}`} value={item.value} unit={'Temperatura ˚C'} status={item.status} />
          })
        }
      </GridCard>

      <Title>Geolocalización</Title>
      <GridCard>
        <CardNode icon={<AiOutlineCompass/>} name='GPS Geolocalización' status={sensors.geolocation.status} />
        <CardValue name={'N˚ Satélites'} value={sensors.geolocation.n_satellites} status={sensors.geolocation.status}/>
        <CardValue span={2} name={'Latitud'} value={sensors.geolocation.latitude} status={sensors.geolocation.status}/>
        <CardValue span={2} name={'Longitud'} value={sensors.geolocation.longitude} status={sensors.geolocation.status}/>
      </GridCard>
    </>
  )
}

export default SensorView