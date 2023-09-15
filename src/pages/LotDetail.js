import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumb'
import { Wrapper, Title, Group, Data } from '../components/Steps'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import LotRepository from '../services/repository/LotRepository'
import IpfsRepository from '../services/IpfsService'

const LotDetail = () => {
  const id = useParams().id
  const [ lot, setLot] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    LotRepository.get(id)
    .then((res) => {
      setLot(res)
    })
  }, [])

  useEffect(() => {
    if (Object.keys(lot).length !== 0) {
      setIsLoading(false);
    }
  }, [lot])

  const getTracking = (data) => {
    IpfsRepository.get(data)
    .then((res) => {
      download(res.data, data + '.csv');
    })
  }

  const download = (csvString, fileName) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:application/octet-stream,' + encodeURIComponent(csvString));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);  
}

  return (
    <>
      <Breadcrumbs />
      {
        isLoading 
        ? null
        : <>
          <Wrapper cols={3}>
              <Title>General</Title>
              <Group>
                <Data title='ID' value={lot.id}></Data>
                <Data title='Embarcación' value={lot.vessel}></Data>
                <Data title='Pescador' value={lot.createdBy}></Data>
              </Group>
              <Title>Zarpe</Title>
              <Group>
                <Data title='Fecha' value={lot.shipping.timestamp}></Data>
                <Data title='Puerto' value={lot.shipping.port}></Data>
              </Group>
              <Title>Pesca</Title>
              <Group>
                <Data title='Arte de pesca' value={lot.fishing.gear}></Data>
                <Data title='Especie' value={lot.fishing.specie}></Data>
              </Group>
              <Title>Desembarque</Title>
              <Group>
                <Data title='Fecha' value={lot.landing.timestamp}></Data>
                <Data title='Puerto' value={lot.landing.port}></Data>
                <Data title='Volumen' value={lot.landing.volume}></Data>
              </Group>
          </Wrapper>
          {
            lot.fishing.geolocation 
            ?  ( <Wrapper cols={2}>
                  <Title>Seguimiento</Title>
                  <Group>
                    <Data title='Gps' value={lot.fishing.geolocation} onClick={() => getTracking(lot.fishing.geolocation)} ></Data>
                    <Data title='Cadena de Frio' value={lot.fishing.coldchain} onClick={() => getTracking(lot.fishing.coldchain)} ></Data>
                  </Group>
                 </Wrapper> )
            : null
          }
          </>
        }
    </>
  )
}

export default LotDetail